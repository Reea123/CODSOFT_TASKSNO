import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="card">
        <h1>{blog.title}</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          By {blog.author?.name} · {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;