import React, { useState } from 'react';
import './AdminBannerPanel.css';

const initialBanners = [
  {
    id: 1,
    title: 'بنر اول',
    image: 'https://via.placeholder.com/600x200',
    link: '',
    active: true,
  },
  {
    id: 2,
    title: 'بنر دوم',
    image: 'https://via.placeholder.com/600x200',
    link: '',
    active: true,
  },
];

export default function AdminBannerPanel() {
  const [banners, setBanners] = useState(initialBanners);
  const [form, setForm] = useState({ title: '', image: '', link: '', active: true });
  const [editingId, setEditingId] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
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
    if (!form.title || !form.image) {
      return;
    }
    setBanners([...banners, { ...form, id: Date.now() }]);
    setForm({ title: '', image: '', link: '', active: true });
  };

  const handleEdit = id => {
    const item = banners.find(b => b.id === id);
    setForm({ ...item });
    setEditingId(id);
  };

  const handleUpdate = () => {
    setBanners(banners.map(b => (b.id === editingId ? { ...form, id: editingId } : b)));
    setForm({ title: '', image: '', link: '', active: true });
    setEditingId(null);
  };

  const handleDelete = id => {
    setBanners(banners.filter(b => b.id !== id));
    if (editingId === id) {
      setForm({ title: '', image: '', link: '', active: true });
      setEditingId(null);
    }
  };

  return (
    <div className='admin-banner-panel'>
      <h2>مدیریت بنرهای صفحه اصلی</h2>
      <div className='banner-list'>
        {banners.map(item => (
          <div className='banner-card' key={item.id}>
            <img src={item.image} alt={item.title} className='banner-image' />
            <div className='banner-info'>
              <h3>{item.title}</h3>
              <span>{item.link ? `لینک: ${item.link}` : 'بدون لینک'}</span>
              <span>{item.active ? 'فعال' : 'غیرفعال'}</span>
              <button onClick={() => handleEdit(item.id)}>ویرایش</button>
              <button onClick={() => handleDelete(item.id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>
      <div className='banner-form'>
        <h3>{editingId ? 'ویرایش بنر' : 'افزودن بنر جدید'}</h3>
        <input name='title' value={form.title} onChange={handleChange} placeholder='عنوان بنر' />
        <input type='file' accept='image/*' onChange={handleImageChange} />
        {form.image && <img src={form.image} alt='preview' className='banner-preview' />}
        <input name='link' value={form.link} onChange={handleChange} placeholder='لینک (اختیاری)' />
        <label>
          <input type='checkbox' name='active' checked={form.active} onChange={handleChange} /> فعال
        </label>
        {editingId ? (
          <button onClick={handleUpdate}>ذخیره تغییرات</button>
        ) : (
          <button onClick={handleAdd}>افزودن بنر</button>
        )}
      </div>
    </div>
  );
}
