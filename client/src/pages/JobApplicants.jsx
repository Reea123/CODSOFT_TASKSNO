import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const statusColors = {
  pending: { bg: "#fff3cd", text: "#856404" },
  reviewed: { bg: "#cfe2ff", text: "#084298" },
  accepted: { bg: "#d1e7dd", text: "#0f5132" },
  rejected: { bg: "#f8d7da", text: "#842029" },
};

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  const fetchApplicants = async () => {
    try {
      const res = await api.get(`/applications/job/${jobId}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      await api.patch(`/applications/${applicationId}/status`, { status });
      fetchApplicants();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Applicants</h1>
      {applications.length === 0 && (
        <p style={{ color: "#6b7280" }}>No applications yet.</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {applications
          .filter((app) => app.candidate)
          .map((app) => (
            <div key={app._id} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h3>{app.candidate.name}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    {app.candidate.email}
                  </p>
                </div>
                <span
                  style={{
                    background: statusColors[app.status].bg,
                    color: statusColors[app.status].text,
                    padding: "0.25rem 0.7rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {app.status}
                </span>
              </div>

              <p style={{ marginTop: "0.75rem" }}>
                <a
                  href={`https://jobboard-backend-p2ya.onrender.com/uploads/${app.resumeFile}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume (PDF)
                </a>
              </p>

              {app.coverLetter && (
                <p style={{ marginTop: "0.5rem", color: "#374151" }}>
                  {app.coverLetter}
                </p>
              )}

              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                style={{ marginTop: "0.75rem", width: "auto" }}
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobApplicants;
