import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (searchTerm = "") => {
    setLoading(true);
    try {
      const res = await api.get("/jobs", { params: { search: searchTerm } });
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

      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}
      >
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" style={{ whiteSpace: "nowrap" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading jobs...</p>}
      {!loading && jobs.length === 0 && <p>No jobs found.</p>}

      <div
        style={{
          background: "rgba(59, 130, 246, 0.15)",
          color: "#60a5fa",
          padding: "0.2rem 0.6rem",
          borderRadius: "4px",
          fontSize: "0.85rem",
          border: "1px solid rgba(59, 130, 246, 0.25)",
        }}
      >
        {jobs.map((job) => (
          <Link
            key={job._id}
            to={`/jobs/${job._id}`}
            className="card"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            <h2>{job.title}</h2>
            <p style={{ color: "#94a3b8" }}>
              {job.company} — {job.location}
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <span
                style={{
                  background: "rgba(59, 130, 246, 0.15)",
                  color: "#60a5fa",
                  padding: "0.25rem 0.7rem",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  border: "1px solid rgba(59, 130, 246, 0.25)",
                }}
              >
                {job.category}
              </span>
              {job.salary && (
                <span style={{ marginLeft: "0.75rem", color: "#94a3b8" }}>
                  {job.salary}
                </span>
              )}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobListing;
