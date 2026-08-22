const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');

// Candidate applies to a job
const applyToJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume PDF is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user.id,
      resumeFile: req.file.path,
      coverLetter
    });

    const candidate = await User.findById(req.user.id);
    console.log('Attempting to send email to:', candidate.email);
    sendEmail(
      candidate.email,
      'Application Submitted Successfully',
      `Hi ${candidate.name},\n\nYour application for "${job.title}" at ${job.company} has been submitted successfully. We'll notify you when there's an update.\n\n— JobBoard`
    );

    res.status(201).json(application);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You already applied to this job' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Candidate views their own applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user.id })
      .populate('job', 'title company location')
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employer views applicants for a specific job they posted
const getApplicantsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('candidate', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employer updates an application's status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate('job').populate('candidate');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    application.status = status;
    await application.save();

    console.log('Attempting to send status update email to:', application.candidate.email);
    sendEmail(
      application.candidate.email,
      `Application Update: ${application.job.title}`,
      `Hi ${application.candidate.name},\n\nYour application for "${application.job.title}" at ${application.job.company} has been updated to: ${status.toUpperCase()}.\n\n— JobBoard`
    );

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employer views all accepted candidates across all their jobs
const getSelectedCandidates = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).select('_id');
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({
      job: { $in: jobIds },
      status: 'accepted'
    })
      .populate('candidate', 'name email')
      .populate('job', 'title company')
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employer sends interview details email to a selected candidate
const sendInterviewEmail = async (req, res) => {
  try {
    const { message } = req.body;
    const application = await Application.findById(req.params.id).populate('job').populate('candidate');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (application.status !== 'accepted') {
      return res.status(400).json({ message: 'Only accepted candidates can be sent interview details' });
    }

    if (application.interviewSent) {
      return res.status(400).json({ message: 'Interview email has already been sent to this candidate' });
    }
    console.log('Sending interview email to:', application.candidate.email);
    console.log('Interview email send attempt completed');

    await sendEmail(
      application.candidate.email,
      `Interview Invitation: ${application.job.title}`,
      `Hi ${application.candidate.name},\n\nCongratulations! You've been selected for an interview for the "${application.job.title}" position at ${application.job.company}.\n\n${message}\n\nLooking forward to speaking with you.\n\n— ${application.job.company} Hiring Team`
    );

    application.interviewSent = true;
    application.interviewMessage = message;
    await application.save();

    res.status(200).json({ message: 'Interview email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  getSelectedCandidates,
  sendInterviewEmail
};