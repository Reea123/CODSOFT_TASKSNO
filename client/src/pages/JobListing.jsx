import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (searchTerm = '') => {
    setLoading(true);
    try {
      const res = await api.get('/jobs', { params: { search: searchTerm } });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  return (
    <div className="container">
      <h1>Browse Jobs</h1>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" style={{ whiteSpace: 'nowrap' }}>Search</button>
      </form>

      {loading && <p>Loading jobs...</p>}
      {!loading && jobs.length === 0 && <p>No jobs found.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {jobs.map((job) => (
          <Link key={job._id} to={`/jobs/${job._id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>{job.title}</h2>
            <p style={{ color: '#6b7280' }}>{job.company} — {job.location}</p>
            <p style={{ marginTop: '0.5rem' }}>
              <span style={{ background: '#eef1ff', color: '#4361ee', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                {job.category}
              </span>
              {job.salary && <span style={{ marginLeft: '0.75rem', color: '#6b7280' }}>{job.salary}</span>}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobListing;