import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!resumeFile) {
      setMessage('Please select a PDF resume to upload');
      setIsError(true);
      return;
    }

    const data = new FormData();
    data.append('jobId', id);
    data.append('coverLetter', coverLetter);
    data.append('resumeFile', resumeFile);

    try {
      await api.post('/applications', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Application submitted successfully!');
      setIsError(false);
      setResumeFile(null);
      setCoverLetter('');
      e.target.reset();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to apply');
      setIsError(true);
    }
  };

  if (!job) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="card">
        <h1>{job.title}</h1>
        <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>{job.company} — {job.location}</p>
        <p style={{ marginTop: '0.5rem' }}>
          <span style={{ background: '#eef1ff', color: '#4361ee', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem' }}>
            {job.category}
          </span>
          {job.salary && <span style={{ marginLeft: '0.75rem', color: '#6b7280' }}>{job.salary}</span>}
        </p>
        <p style={{ marginTop: '1.25rem' }}>{job.description}</p>
      </div>

      {user && user.role === 'candidate' && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h2>Apply for this job</h2>
          {message && <p className={isError ? 'error-text' : 'success-text'}>{message}</p>}
          <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>
              Resume (PDF only, max 5MB)
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                required
                style={{ marginTop: '0.4rem' }}
              />
            </label>
            <textarea
              placeholder="Cover letter (optional)"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
            />
            <button type="submit" style={{ alignSelf: 'flex-start' }}>Submit Application</button>
          </form>
        </div>
      )}

      {!user && <p style={{ marginTop: '1.5rem' }}>Please log in as a candidate to apply.</p>}
      {user && user.role === 'employer' && <p style={{ marginTop: '1.5rem' }}>Employers cannot apply to jobs.</p>}
    </div>
  );
};

export default JobDetail;