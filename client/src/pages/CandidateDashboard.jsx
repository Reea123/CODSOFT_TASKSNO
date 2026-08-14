import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const statusColors = {
  pending: { bg: '#fff3cd', text: '#856404' },
  reviewed: { bg: '#cfe2ff', text: '#084298' },
  accepted: { bg: '#d1e7dd', text: '#0f5132' },
  rejected: { bg: '#f8d7da', text: '#842029' }
};

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications/my-applications');
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="container">
      <h1>My Applications</h1>
      {applications.length === 0 && (
        <p style={{ color: '#6b7280' }}>
          You haven't applied to any jobs yet. <Link to="/jobs">Browse jobs</Link>
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {applications.map((app) => (
          <div key={app._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>{app.job.title}</h3>
              <p style={{ color: '#6b7280' }}>{app.job.company} — {app.job.location}</p>
            </div>
            <span style={{
              background: statusColors[app.status].bg,
              color: statusColors[app.status].text,
              padding: '0.25rem 0.7rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'capitalize'
            }}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateDashboard;