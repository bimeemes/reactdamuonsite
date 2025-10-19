import React, { useState } from 'react';
import './StaffPanel.css';

const initialStaff = [
  {
    id: 1,
    name: 'علی رضایی',
    position: 'مدیر عامل',
    info: 'دارای 15 سال سابقه در صنعت بیمه.',
    image: 'https://via.placeholder.com/120x120',
  },
  {
    id: 2,
    name: 'مریم احمدی',
    position: 'مدیر فروش',
    info: 'متخصص فروش و بازاریابی.',
    image: 'https://via.placeholder.com/120x120',
  },
];

export default function StaffPanel() {
  const [staff, setStaff] = useState(initialStaff);
  const [form, setForm] = useState({ name: '', position: '', info: '', image: '' });
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
    if (!form.name || !form.position || !form.info || !form.image) {
      return;
    }
    setStaff([...staff, { ...form, id: Date.now() }]);
    setForm({ name: '', position: '', info: '', image: '' });
  };

  const handleEdit = id => {
    const item = staff.find(s => s.id === id);
    setForm({ ...item });
    setEditingId(id);
  };

  const handleUpdate = () => {
    setStaff(staff.map(s => (s.id === editingId ? { ...form, id: editingId } : s)));
    setForm({ name: '', position: '', info: '', image: '' });
    setEditingId(null);
  };

  const handleDelete = id => {
    setStaff(staff.filter(s => s.id !== id));
    if (editingId === id) {
      setForm({ name: '', position: '', info: '', image: '' });
      setEditingId(null);
    }
  };

  return (
    <div className='staff-panel'>
      <h2>مدیریت پرسنل شرکت</h2>
      <div className='staff-list'>
        {staff.map(item => (
          <div className='staff-card' key={item.id}>
            <img src={item.image} alt={item.name} className='staff-image' />
            <div className='staff-info'>
              <h3>{item.name}</h3>
              <span>{item.position}</span>
              <p>{item.info}</p>
              <button onClick={() => handleEdit(item.id)}>ویرایش</button>
              <button onClick={() => handleDelete(item.id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>
      <div className='staff-form'>
        <h3>{editingId ? 'ویرایش پرسنل' : 'افزودن پرسنل جدید'}</h3>
        <input name='name' value={form.name} onChange={handleChange} placeholder='نام' />
        <input name='position' value={form.position} onChange={handleChange} placeholder='سمت' />
        <textarea name='info' value={form.info} onChange={handleChange} placeholder='توضیحات' />
        <input type='file' accept='image/*' onChange={handleImageChange} />
        {form.image && <img src={form.image} alt='preview' className='staff-preview' />}
        {editingId ? (
          <button onClick={handleUpdate}>ذخیره تغییرات</button>
        ) : (
          <button onClick={handleAdd}>افزودن پرسنل</button>
        )}
      </div>
    </div>
  );
}
