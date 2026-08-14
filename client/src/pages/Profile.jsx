import { useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: user.name, email: user.email, password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await api.patch('/auth/profile', formData);
      const token = localStorage.getItem('token');
      login(res.data.user, token);
      setMessage('Profile updated successfully!');
      setIsError(false);
      setFormData({ ...formData, password: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
      setIsError(true);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', padding: '0 1.5rem' }}>
      <div className="card">
        <h1>My Profile</h1>
        {message && <p className={isError ? 'error-text' : 'success-text'}>{message}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="New Password (leave blank to keep current)" value={formData.password} onChange={handleChange} />
          <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Role: <strong>{user.role}</strong></p>
          <button type="submit" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;