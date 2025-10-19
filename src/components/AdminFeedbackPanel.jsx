import React, { useState } from 'react';
import './AdminFeedbackPanel.css';

const initialFeedback = [
  {
    id: 1,
    name: 'رضا محمدی',
    email: 'reza@email.com',
    message: 'پاسخگویی بخش خسارت کند بود.',
    status: 'جدید',
    reply: '',
  },
  {
    id: 2,
    name: 'سارا احمدی',
    email: 'sara@email.com',
    message: 'سایت بسیار کاربردی است.',
    status: 'جدید',
    reply: '',
  },
];

export default function AdminFeedbackPanel() {
  const [feedbacks, setFeedbacks] = useState(initialFeedback);
  const [replyForm, setReplyForm] = useState({ reply: '' });
  const [replyingId, setReplyingId] = useState(null);

  const handleReply = id => {
    setReplyingId(id);
    setReplyForm({ reply: '' });
  };

  const handleReplyChange = e => {
    setReplyForm({ reply: e.target.value });
  };

  const handleSendReply = () => {
    setFeedbacks(
      feedbacks.map(f =>
        f.id === replyingId ? { ...f, reply: replyForm.reply, status: 'پاسخ داده شد' } : f
      )
    );
    setReplyingId(null);
    setReplyForm({ reply: '' });
  };

  const handleDelete = id => {
    setFeedbacks(feedbacks.filter(f => f.id !== id));
    if (replyingId === id) {
      setReplyingId(null);
      setReplyForm({ reply: '' });
    }
  };

  return (
    <div className='admin-feedback-panel'>
      <h2>مدیریت بازخورد و شکایات</h2>
      <div className='feedback-list'>
        {feedbacks.map(item => (
          <div className='feedback-card' key={item.id}>
            <div className='feedback-info'>
              <h3>{item.name}</h3>
              <span>{item.email}</span>
              <p>{item.message}</p>
              <span className={`feedback-status ${item.status === 'جدید' ? 'new' : 'replied'}`}>
                {item.status}
              </span>
              {item.reply && (
                <div className='feedback-reply'>
                  <strong>پاسخ:</strong> {item.reply}
                </div>
              )}
              <button onClick={() => handleReply(item.id)} disabled={item.status !== 'جدید'}>
                پاسخ
              </button>
              <button onClick={() => handleDelete(item.id)}>حذف</button>
            </div>
            {replyingId === item.id && (
              <div className='reply-form'>
                <textarea
                  value={replyForm.reply}
                  onChange={handleReplyChange}
                  placeholder='پاسخ...'
                  rows={3}
                />
                <button onClick={handleSendReply}>ارسال پاسخ</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
