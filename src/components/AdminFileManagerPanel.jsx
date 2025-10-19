import React, { useState } from 'react';
import './AdminFileManagerPanel.css';

const initialFiles = [
  {
    id: 1,
    name: 'sample-image.jpg',
    url: 'https://via.placeholder.com/120x80',
    type: 'image',
  },
  {
    id: 2,
    name: 'document.pdf',
    url: '',
    type: 'file',
  },
];

export default function AdminFileManagerPanel() {
  const [files, setFiles] = useState(initialFiles);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = ev => {
        setFiles(f => [
          ...f,
          {
            id: Date.now(),
            name: file.name,
            url: ev.target.result,
            type: file.type.startsWith('image') ? 'image' : 'file',
          },
        ]);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = id => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className='admin-file-manager-panel'>
      <h2>مدیریت فایل‌ها و تصاویر</h2>
      <div className='file-upload-section'>
        <input type='file' onChange={handleFileChange} disabled={uploading} />
        {uploading && <span className='uploading'>در حال آپلود...</span>}
      </div>
      <div className='file-list'>
        {files.map(file => (
          <div className='file-card' key={file.id}>
            {file.type === 'image' ? (
              <img src={file.url} alt={file.name} className='file-image' />
            ) : (
              <span className='file-icon'>DOC</span>
            )}
            <div className='file-info'>
              <span className='file-name'>{file.name}</span>
              <button onClick={() => navigator.clipboard.writeText(file.url)} disabled={!file.url}>
                کپی آدرس
              </button>
              <button onClick={() => handleDelete(file.id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
