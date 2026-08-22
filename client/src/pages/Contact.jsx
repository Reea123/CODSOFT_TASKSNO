const Contact = () => {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <div className="card">
        <p style={{ marginBottom: '1rem' }}>
          Have questions or feedback? Reach out to us anytime.
        </p>
        <p style={{ marginBottom: '0.5rem' }}>📧 Email: <a href="mailto:support@jobboard.com">support@jobboard.com</a></p>
        <p style={{ marginBottom: '0.5rem' }}>📍 Location: Kolkata, India</p>
        <p>💬 We typically respond within 24 hours.</p>
      </div>
    </div>
  );
};

export default Contact;