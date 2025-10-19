import React, { useState } from 'react';
import './AdminBranchPanel.css';

const initialBranches = [
  {
    id: 1,
    name: 'تهران',
    address: 'تهران - خیابان خالد اسلامبولی (وزرا)، کوچه رفیعی(بیستم)، پلاک 22، واحد 1 و 2',
    phone: '57389000-021',
    map: 'https://goo.gl/maps/tehran',
  },
  {
    id: 2,
    name: 'سونگون (آذربایجان شرقی)',
    address: 'تبریز - مجتمع مس سونگون - پشتیبانی معدن - جنب بانک تجارت',
    phone: '44540563-041',
    map: 'https://goo.gl/maps/sungoon',
  },
];

export default function AdminBranchPanel() {
  const [branches, setBranches] = useState(initialBranches);
  const [form, setForm] = useState({ name: '', address: '', phone: '', map: '' });
  const [editingId, setEditingId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.name || !form.address || !form.phone) {
      return;
    }
    setBranches([...branches, { ...form, id: Date.now() }]);
    setForm({ name: '', address: '', phone: '', map: '' });
  };

  const handleEdit = id => {
    const item = branches.find(b => b.id === id);
    setForm({ ...item });
    setEditingId(id);
  };

  const handleUpdate = () => {
    setBranches(branches.map(b => (b.id === editingId ? { ...form, id: editingId } : b)));
    setForm({ name: '', address: '', phone: '', map: '' });
    setEditingId(null);
  };

  const handleDelete = id => {
    setBranches(branches.filter(b => b.id !== id));
    if (editingId === id) {
      setForm({ name: '', address: '', phone: '', map: '' });
      setEditingId(null);
    }
  };

  return (
    <div className='admin-branch-panel'>
      <h2>مدیریت شعب و اطلاعات تماس</h2>
      <div className='branch-list'>
        {branches.map(item => (
          <div className='branch-card' key={item.id}>
            <div className='branch-info'>
              <h3>{item.name}</h3>
              <p>
                <strong>آدرس:</strong> {item.address}
              </p>
              <p>
                <strong>تلفن:</strong> {item.phone}
              </p>
              {item.map && (
                <a href={item.map} target='_blank' rel='noopener noreferrer' className='map-link'>
                  مشاهده نقشه
                </a>
              )}
              <button onClick={() => handleEdit(item.id)}>ویرایش</button>
              <button onClick={() => handleDelete(item.id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>
      <div className='branch-form'>
        <h3>{editingId ? 'ویرایش شعبه' : 'افزودن شعبه جدید'}</h3>
        <input name='name' value={form.name} onChange={handleChange} placeholder='نام شعبه' />
        <input name='address' value={form.address} onChange={handleChange} placeholder='آدرس' />
        <input name='phone' value={form.phone} onChange={handleChange} placeholder='تلفن' />
        <input
          name='map'
          value={form.map}
          onChange={handleChange}
          placeholder='لینک نقشه (اختیاری)'
        />
        {editingId ? (
          <button onClick={handleUpdate}>ذخیره تغییرات</button>
        ) : (
          <button onClick={handleAdd}>افزودن شعبه</button>
        )}
      </div>
    </div>
  );
}
