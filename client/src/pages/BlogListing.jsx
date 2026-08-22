import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <h1>Blog</h1>
      {blogs.length === 0 && <p style={{ color: '#94a3b8' }}>No posts yet.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <h2>{blog.title}</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>By {blog.author?.name} · {new Date(blog.createdAt).toLocaleDateString()}</p>
            <p style={{ marginTop: '0.5rem' }}>{blog.content.slice(0, 150)}{blog.content.length > 150 ? '...' : ''}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogListing;