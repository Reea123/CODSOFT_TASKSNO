import { useState, useEffect } from "react";
import api from "../api/axios";

const SelectedCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [openFormId, setOpenFormId] = useState(null);
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState({});

  const fetchSelected = async () => {
    try {
      const res = await api.get("/applications/selected-candidates");
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSelected();
  }, []);

const handleSendInterview = async (appId) => {
  try {
    await api.post(`/applications/${appId}/send-interview`, { message });
    setStatusMsg({ ...statusMsg, [appId]: 'Interview email sent!' });
    setMessage('');
    setOpenFormId(null);
    fetchSelected(); // refresh to get updated interviewSent flag
  } catch (err) {
    setStatusMsg({ ...statusMsg, [appId]: err.response?.data?.message || 'Failed to send email' });
  }
};

  return (
    <div className="container">
      <h1>Selected Candidates</h1>
      {candidates.length === 0 && (
        <p style={{ color: "#6b7280" }}>No candidates selected yet.</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {candidates.map((app) => (
          <div key={app._id} className="card">
            <h3>{app.candidate.name}</h3>
            <p style={{ color: "#6b7280" }}>{app.candidate.email}</p>
            <p style={{ marginTop: "0.5rem" }}>
              Hired for: <strong>{app.job.title}</strong> at {app.job.company}
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <a
                href={`http://localhost:5000/uploads/${app.resumeFile}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume (PDF)
              </a>
            </p>

            {app.interviewSent ? (
              <p
                style={{
                  marginTop: "0.75rem",
                  color: "#1e8a72",
                  fontWeight: 600,
                }}
              >
                ✓ Interview email already sent
              </p>
            ) : openFormId === app._id ? (
              <div style={{ marginTop: "0.75rem" }}>
                <textarea
                  placeholder="Interview details: date, time, location or video call link, etc."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  style={{ marginBottom: "0.5rem" }}
                />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => handleSendInterview(app._id)}>
                    Send Email
                  </button>
                  <button
                    onClick={() => {
                      setOpenFormId(null);
                      setMessage("");
                    }}
                    style={{ backgroundColor: "#9ca3af" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setOpenFormId(app._id)}
                style={{ marginTop: "0.75rem" }}
              >
                Schedule Interview
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedCandidates;
