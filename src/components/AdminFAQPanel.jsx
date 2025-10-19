import React, { useState } from 'react';
import './AdminFAQPanel.css';

const initialFAQs = [
  {
    id: 1,
    question: 'چگونه بیمه ثبت کنم؟',
    answer: 'برای ثبت بیمه، به بخش سامانه‌ها مراجعه کنید و فرم مربوطه را تکمیل نمایید.',
  },
  {
    id: 2,
    question: 'مدارک لازم برای خسارت چیست؟',
    answer: 'مدارک لازم شامل اصل بیمه‌نامه، کارت ملی و مدارک مربوط به حادثه می‌باشد.',
  },
];

export default function AdminFAQPanel() {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [editingId, setEditingId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.question || !form.answer) {
      return;
    }
    setFaqs([...faqs, { ...form, id: Date.now() }]);
    setForm({ question: '', answer: '' });
  };

  const handleEdit = id => {
    const item = faqs.find(f => f.id === id);
    setForm({ question: item.question, answer: item.answer });
    setEditingId(id);
  };

  const handleUpdate = () => {
    setFaqs(faqs.map(f => (f.id === editingId ? { ...form, id: editingId } : f)));
    setForm({ question: '', answer: '' });
    setEditingId(null);
  };

  const handleDelete = id => {
    setFaqs(faqs.filter(f => f.id !== id));
    if (editingId === id) {
      setForm({ question: '', answer: '' });
      setEditingId(null);
    }
  };

  return (
    <div className='admin-faq-panel'>
      <h2>مدیریت سوالات متداول</h2>
      <div className='faq-list'>
        {faqs.map(item => (
          <div className='faq-card' key={item.id}>
            <div className='faq-info'>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              <button onClick={() => handleEdit(item.id)}>ویرایش</button>
              <button onClick={() => handleDelete(item.id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>
      <div className='faq-form'>
        <h3>{editingId ? 'ویرایش سوال' : 'افزودن سوال جدید'}</h3>
        <input name='question' value={form.question} onChange={handleChange} placeholder='سوال' />
        <textarea
          name='answer'
          value={form.answer}
          onChange={handleChange}
          placeholder='پاسخ'
          rows={4}
        />
        {editingId ? (
          <button onClick={handleUpdate}>ذخیره تغییرات</button>
        ) : (
          <button onClick={handleAdd}>افزودن سوال</button>
        )}
      </div>
    </div>
  );
}
