import React, { useState } from 'react';
import './AdminStaticPagesPanel.css';

const initialPages = [
  {
    id: 'about',
    title: 'درباره ما',
    content: 'متن نمونه درباره ما...',
  },
  {
    id: 'contact',
    title: 'تماس با ما',
    content: 'متن نمونه تماس با ما...',
  },
  {
    id: 'faq',
    title: 'سوالات متداول',
    content: 'متن نمونه سوالات متداول...',
  },
];

export default function AdminStaticPagesPanel() {
  const [pages, setPages] = useState(initialPages);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '' });

  const handleEdit = id => {
    const page = pages.find(p => p.id === id);
    setForm({ title: page.title, content: page.content });
    setEditingId(id);
  };

  const handleUpdate = () => {
    setPages(
      pages.map(p => (p.id === editingId ? { ...p, title: form.title, content: form.content } : p))
    );
    setEditingId(null);
    setForm({ title: '', content: '' });
  };

  return (
    <div className='admin-static-pages-panel'>
      <h2>مدیریت صفحات ثابت</h2>
      <div className='static-pages-list'>
        {pages.map(page => (
          <div className='static-page-card' key={page.id}>
            <h3>{page.title}</h3>
            <p>{page.content.slice(0, 80)}...</p>
            <button onClick={() => handleEdit(page.id)}>ویرایش</button>
          </div>
        ))}
      </div>
      {editingId && (
        <div className='static-page-form'>
          <h3>ویرایش صفحه</h3>
          <input
            name='title'
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder='عنوان صفحه'
          />
          <textarea
            name='content'
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            placeholder='محتوا'
            rows={8}
          />
          <button onClick={handleUpdate}>ذخیره تغییرات</button>
        </div>
      )}
    </div>
  );
}
