import React, { useEffect, useState } from 'react';
import './AdminQuestionnairePanel.css';
import { API_ENDPOINTS } from '../config/api.js';

export default function AdminQuestionnairePanel() {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(API_ENDPOINTS.getSubmissions)
      .then(res => res.json())
      .then(data => {
        // Handle both array and object responses
        const submissions = Array.isArray(data) ? data : data.submissions || [];
        setSubmissions(submissions);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching submissions:', err);
        setError('خطا در دریافت داده‌ها');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let f = submissions;
    if (search) {
      f = f.filter(s => s.phone.includes(search));
    }
    if (dateFrom) {
      const fromTime = new Date(dateFrom).getTime();
      f = f.filter(s => parseInt(s.id) >= fromTime);
    }
    if (dateTo) {
      const toTime = new Date(dateTo).setHours(23, 59, 59, 999); // End of day
      f = f.filter(s => parseInt(s.id) <= toTime);
    }
    setFiltered(f);
  }, [search, dateFrom, dateTo, submissions]);

  const exportCSV = () => {
    if (filtered.length === 0) {
      return;
    }

    // Get all unique keys from all submissions (excluding system fields)
    const systemFields = ['id', 'phone', 'submittedAt', 'ipAddress'];
    const allKeys = new Set();
    filtered.forEach(submission => {
      Object.keys(submission).forEach(key => {
        if (!systemFields.includes(key)) {
          allKeys.add(key);
        }
      });
    });

    const header = ['شماره موبایل', 'تاریخ ثبت', 'IP Address', ...Array.from(allKeys)];

    const rows = filtered.map(s => [
      s.phone,
      new Date(parseInt(s.id)).toLocaleString('fa-IR'),
      s.ipAddress || '',
      ...Array.from(allKeys).map(key => s[key] || ''),
    ]);

    const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `questionnaire_submissions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportExcel = async () => {
    if (filtered.length === 0) {
      return;
    }

    // Dynamically import SheetJS for Excel export
    // For now, we'll use a simple CSV export without xlsx
    const csvContent = `data:text/csv;charset=utf-8,نام,شماره تماس,نوع پرسشنامه,تاریخ ثبت,وضعیت\\n${responses
      .map(
        response =>
          `${response.personalInfo?.name || 'نامشخص'},${response.personalInfo?.phone || 'نامشخص'},${response.questionnaireType || 'نامشخص'},${response.createdAt ? new Date(response.createdAt).toLocaleDateString('fa-IR') : 'نامشخص'},${response.status || 'در انتظار'}`
      )
      .join('\\n')}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'questionnaire-responses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Get all unique keys from all submissions (excluding system fields)
    const systemFields = ['id', 'phone', 'submittedAt', 'ipAddress'];
    const allKeys = new Set();
    filtered.forEach(submission => {
      Object.keys(submission).forEach(key => {
        if (!systemFields.includes(key)) {
          allKeys.add(key);
        }
      });
    });

    const header = ['شماره موبایل', 'تاریخ ثبت', 'IP Address', ...Array.from(allKeys)];

    const rows = filtered.map(s => [
      s.phone,
      new Date(parseInt(s.id)).toLocaleString('fa-IR'),
      s.ipAddress || '',
      ...Array.from(allKeys).map(key => s[key] || ''),
    ]);

    const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Questionnaire');
    XLSX.writeFile(wb, `questionnaire_submissions_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const printView = () => {
    window.print();
  };

  return (
    <div className='admin-questionnaire-panel'>
      <h2>پاسخ‌های پرسشنامه</h2>
      <div className='filters'>
        <input
          placeholder='جستجو شماره موبایل'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input type='date' value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        <input type='date' value={dateTo} onChange={e => setDateTo(e.target.value)} />
        <button onClick={exportCSV}>خروجی CSV</button>
        <button onClick={exportExcel}>خروجی Excel</button>
        <button onClick={printView}>چاپ</button>
      </div>
      {loading ? (
        <div>در حال بارگذاری...</div>
      ) : error ? (
        <div className='error'>{error}</div>
      ) : (
        <div className='table-wrapper'>
          {filtered.length === 0 ? (
            <div className='no-data'>هیچ پاسخی ثبت نشده است</div>
          ) : (
            (() => {
              // Get all unique keys from all submissions (excluding system fields)
              const systemFields = ['id', 'phone', 'submittedAt', 'ipAddress'];
              const allKeys = new Set();
              filtered.forEach(submission => {
                Object.keys(submission).forEach(key => {
                  if (!systemFields.includes(key)) {
                    allKeys.add(key);
                  }
                });
              });
              const dynamicKeys = Array.from(allKeys);

              return (
                <table className='submissions-table'>
                  <thead>
                    <tr>
                      <th>شماره موبایل</th>
                      <th>تاریخ ثبت</th>
                      <th>IP Address</th>
                      {dynamicKeys.map(key => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(s => (
                      <tr key={s.id}>
                        <td>{s.phone.replace(/(\d{4})\d{3}(\d{4})/, '$1***$2')}</td>
                        <td>{new Date(parseInt(s.id)).toLocaleString('fa-IR')}</td>
                        <td>{s.ipAddress || 'نامشخص'}</td>
                        {dynamicKeys.map(key => (
                          <td key={key}>{s[key] || '—'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
}
