import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const EmployerDashboard = () => {
  const [blogData, setBlogData] = useState({ title: '', content: '' });
  const [blogMessage, setBlogMessage] = useState('');

  const handleBlogChange = (e) => setBlogData({ ...blogData, [e.target.name]: e.target.value });

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogMessage('');
    try {
      await api.post('/blogs', blogData);
      setBlogMessage('Blog post published!');
      setBlogData({ title: '', content: '' });
    } catch (err) {
      setBlogMessage(err.response?.data?.message || 'Failed to publish');
    }
  };

  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', company: '', location: '', category: '', salary: ''
  });
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchMyJobs = async () => {
    try {
      const res = await api.get('/jobs/my-jobs');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({ title: '', description: '', company: '', location: '', category: '', salary: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (editingId) {
        await api.patch(`/jobs/${editingId}`, formData);
        setMessage('Job updated successfully!');
      } else {
        await api.post('/jobs', formData);
        setMessage('Job posted successfully!');
      }
      resetForm();
      fetchMyJobs();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save job');
    }
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      category: job.category,
      salary: job.salary || ''
    });
    setEditingId(job._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await api.delete(`/jobs/${jobId}`);
      fetchMyJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Employer Dashboard</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/employer/selected-candidates">
          <button>View Selected Candidates</button>
        </Link>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>{editingId ? 'Edit Job' : 'Post a New Job'}</h2>
        {message && <p className="success-text">{message}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} rows={3} required />
          <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
          <input name="category" placeholder="Category (e.g. Software Development)" value={formData.category} onChange={handleChange} required />
          <input name="salary" placeholder="Salary (optional)" value={formData.salary} onChange={handleChange} />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit">{editingId ? 'Update Job' : 'Post Job'}</button>
            {editingId && <button type="button" onClick={resetForm} style={{ backgroundColor: '#9ca3af' }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>Write a Blog Post</h2>
        {blogMessage && <p className="success-text">{blogMessage}</p>}
        <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <input name="title" placeholder="Post Title" value={blogData.title} onChange={handleBlogChange} required />
          <textarea name="content" placeholder="Write your post..." value={blogData.content} onChange={handleBlogChange} rows={5} required />
          <button type="submit" style={{ alignSelf: 'flex-start' }}>Publish Post</button>
        </form>
      </div>

      <h2>Your Posted Jobs</h2>
      {jobs.length === 0 && <p style={{ color: '#94a3b8' }}>You haven't posted any jobs yet.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {jobs.map((job) => (
          <div key={job._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3>{job.title}</h3>
              <p style={{ color: '#94a3b8' }}>{job.company} — {job.location}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to={`/employer/jobs/${job._id}/applicants`}>
                <button>View Applicants</button>
              </Link>
              <button onClick={() => handleEdit(job)} style={{ backgroundColor: '#f59e0b' }}>Edit</button>
              <button onClick={() => handleDelete(job._id)} style={{ backgroundColor: '#e63946' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;