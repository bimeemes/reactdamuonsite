import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './AdminNewsPanel.css';

const initialNews = [
  {
    id: 1,
    title: 'خبر اول',
    date: '2025-09-15',
    publishDate: '2025-09-15',
    summary: 'خلاصه خبر اول به صورت نمونه.',
    image: 'https://via.placeholder.com/120x80',
  },
  {
    id: 2,
    title: 'خبر دوم',
    date: '2025-09-14',
    publishDate: '2025-09-14',
    summary: 'خلاصه خبر دوم به صورت نمونه.',
    image: 'https://via.placeholder.com/120x80',
  },
];

export default function AdminNewsPanel() {
  const [news, setNews] = useState(initialNews);
  const [form, setForm] = useState({
    title: '',
    date: '',
    publishDate: '',
    summary: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setForm(f => ({ ...f, image: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!form.title || !form.date || !form.publishDate || !form.summary || !form.image) {
      return;
    }
    setNews([...news, { ...form, id: Date.now() }]);
    setForm({ title: '', date: '', publishDate: '', summary: '', image: '' });
  };

  const handleEdit = id => {
    const item = news.find(n => n.id === id);
    setForm({ ...item });
    setEditingId(id);
  };

  const handleUpdate = () => {
    setNews(news.map(n => (n.id === editingId ? { ...form, id: editingId } : n)));
    setForm({ title: '', date: '', publishDate: '', summary: '', image: '' });
    setEditingId(null);
  };
  // Drag-and-drop reorder
  const handleDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const reordered = Array.from(news);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setNews(reordered);
  };

  const handleDelete = id => {
    setNews(news.filter(n => n.id !== id));
    if (editingId === id) {
      setForm({ title: '', date: '', summary: '', image: '' });
      setEditingId(null);
    }
  };

  // Only show news with publishDate <= today
  const today = new Date().toISOString().slice(0, 10);
  const visibleNews = news.filter(n => n.publishDate <= today);

  return (
    <div className='admin-news-panel'>
      <h2>مدیریت اخبار</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='news-list'>
          {provided => (
            <div className='admin-news-list' ref={provided.innerRef} {...provided.droppableProps}>
              {news.map((item, idx) => (
                <Draggable key={item.id} draggableId={String(item.id)} index={idx}>
                  {dragProvided => (
                    <div
                      className='admin-news-card'
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <img src={item.image} alt={item.title} className='admin-news-image' />
                      <div className='admin-news-info'>
                        <h3>{item.title}</h3>
                        <span>تاریخ خبر: {item.date}</span>
                        <span>تاریخ انتشار: {item.publishDate}</span>
                        <p>{item.summary}</p>
                        <button onClick={() => handleEdit(item.id)}>ویرایش</button>
                        <button onClick={() => handleDelete(item.id)}>حذف</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className='admin-news-form'>
        <h3>{editingId ? 'ویرایش خبر' : 'افزودن خبر جدید'}</h3>
        <input name='title' value={form.title} onChange={handleChange} placeholder='عنوان خبر' />
        <input
          name='date'
          value={form.date}
          onChange={handleChange}
          placeholder='تاریخ خبر'
          type='date'
        />
        <input
          name='publishDate'
          value={form.publishDate}
          onChange={handleChange}
          placeholder='تاریخ انتشار'
          type='date'
        />
        <textarea
          name='summary'
          value={form.summary}
          onChange={handleChange}
          placeholder='خلاصه خبر'
        />
        <input type='file' accept='image/*' onChange={handleImageChange} />
        {form.image && <img src={form.image} alt='preview' className='admin-news-preview' />}
        {editingId ? (
          <button onClick={handleUpdate}>ذخیره تغییرات</button>
        ) : (
          <button onClick={handleAdd}>افزودن خبر</button>
        )}
      </div>
    </div>
  );
}
