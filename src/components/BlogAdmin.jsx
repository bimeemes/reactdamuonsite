import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
// Enable Jalali calendar in dayjs
dayjs.extend(jalaliday);
import './BlogAdmin.css';

const initialForm = {
  title: '',
  date: '',
  image: '',
  tags: '',
  summary: '',
  content: '',
};

const BlogAdmin = ({ onLogout }) => {
  const [form, setForm] = useState(initialForm);
  // Simple date string state instead of MUI DatePicker
  const [selectedDate, setSelectedDate] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts from backend
  useEffect(() => {
    setLoading(true);
    fetch('/api/blog-posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('خطا در دریافت پست‌ها');
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Image upload handler
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      setForm(f => ({ ...f, image: data.url }));
    } catch {
      setError('خطا در آپلود تصویر');
    }
    setLoading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        // Update post
        const res = await fetch(`/api/blog-posts/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          throw new Error();
        }
        const updated = await res.json();
        setPosts(posts => posts.map(p => (p.id === editingId ? updated : p)));
      } else {
        // Create post
        const res = await fetch('/api/blog-posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          throw new Error();
        }
        const created = await res.json();
        setPosts(posts => [created, ...posts]);
      }
      setForm(initialForm);
      setEditingId(null);
    } catch {
      setError('خطا در ذخیره پست');
    }
    setLoading(false);
  };

  const handleEdit = id => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setForm({
        title: post.title || '',
        date: post.date || '',
        image: post.image || '',
        tags: post.tags || '',
        summary: post.summary || '',
        content: post.content || '',
      });
      setEditingId(id);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('آیا از حذف این پست مطمئن هستید؟')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/blog-posts/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error();
      }
      setPosts(posts => posts.filter(p => p.id !== id));
      if (editingId === id) {
        setForm(initialForm);
        setEditingId(null);
      }
    } catch {
      setError('خطا در حذف پست');
    }
    setLoading(false);
  };

  return (
    <div className='blog-admin-container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>مدیریت بلاگ</h2>
        {onLogout && (
          <button
            style={{
              background: '#e53935',
              color: '#fff',
              border: 'none',
              borderRadius: '0.7rem',
              padding: '0.5rem 1.2rem',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
            onClick={onLogout}
          >
            خروج
          </button>
        )}
      </div>
      <form className='blog-admin-form' onSubmit={handleSubmit}>
        <input
          name='title'
          value={form.title}
          onChange={handleChange}
          placeholder='عنوان'
          required
        />
        <div style={{ marginBottom: '0.7rem' }}>
          <input
            type='date'
            name='date'
            value={selectedDate}
            onChange={e => {
              setSelectedDate(e.target.value);
              // Convert to Persian date format for display
              const gregorianDate = new Date(e.target.value);
              const jalaliDate = dayjs(gregorianDate).calendar('jalali').format('jYYYY/jMM/jDD');
              setForm(prev => ({ ...prev, date: jalaliDate }));
            }}
            placeholder='انتخاب تاریخ'
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              border: '1.5px solid #2196f3',
              borderRadius: '0.8rem',
              fontSize: '1rem',
              background: '#f8fafc',
              direction: 'ltr',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <input
            name='image'
            value={form.image}
            onChange={handleChange}
            placeholder='آدرس تصویر (اختیاری)'
            style={{ flex: 1 }}
          />
          <input type='file' accept='image/*' onChange={handleImageUpload} style={{ flex: 2 }} />
        </div>
        {form.image && (
          <div style={{ margin: '0.5rem 0' }}>
            <img
              src={form.image}
              alt='پیش‌نمایش تصویر'
              style={{
                maxWidth: '180px',
                maxHeight: '120px',
                borderRadius: '0.7rem',
                border: '1px solid #ccc',
              }}
            />
          </div>
        )}
        <input
          name='tags'
          value={form.tags}
          onChange={handleChange}
          placeholder='برچسب‌ها (با ویرگول جدا کنید)'
        />
        <input name='summary' value={form.summary} onChange={handleChange} placeholder='خلاصه' />
        <textarea
          name='content'
          value={form.content}
          onChange={handleChange}
          placeholder='متن کامل پست'
          rows={8}
          required
        />
        <button type='submit' disabled={loading}>
          {editingId ? 'ویرایش پست' : 'افزودن پست'}
        </button>
        {editingId && (
          <button
            type='button'
            onClick={() => {
              setForm(initialForm);
              setEditingId(null);
            }}
          >
            انصراف
          </button>
        )}
      </form>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <div className='blog-admin-list'>
        <h3>پست‌های فعلی</h3>
        {loading ? (
          <div>در حال بارگذاری...</div>
        ) : (
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <strong>{post.title}</strong> <span>({post.date})</span>
                <button onClick={() => handleEdit(post.id)}>ویرایش</button>
                <button onClick={() => handleDelete(post.id)}>حذف</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
