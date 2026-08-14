import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobListing from './pages/JobListing';
import JobDetail from './pages/JobDetail';
import JobApplicants from './pages/JobApplicants';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import Profile from './pages/Profile';
import SelectedCandidates from './pages/SelectedCandidates';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/employer/jobs/:jobId/applicants" element={<JobApplicants />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/employer/selected-candidates" element={<SelectedCandidates />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;