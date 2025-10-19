import React, { useState } from 'react';
import './Questionnaire.css';
import { API_ENDPOINTS } from '../config/api.js';

const questions = [
  'میزان تطابق مبلغ دریافتی خسارت با هزینه های پرداخت شده توسط شما',
  'سرعت پرداخت خسارت ها پس از ثبت و بارگذاری مدارک',
  'سرعت پرداخت خسارت های پرونده های بیمارستانی',
  'سادگی و سرعت فرآیند دریافت معرفی نامه آنلاین برای خدمات بستری',
  'کیفیت همکاری و تسهیل پذیرش در مراکز درمانی طرف قرارداد',
  'شفافیت و اطلاع رسانی در مورد نحوه ارزیابی و محاسبه مبلغ خسارت ها',
  'میزان کیفیت و کارایی خدمات غیر حضوری در سامانه پیگیری هزینه درمانی سیناد',
  'نحوه برخورد کارکنان کارگزاری دامون',
  'نحوه برخورد کارکنان شرکت بیمه البرز',
  'اطلاع رسانی از نحوه رسیدگی به شکایات و بررسی آن (در صورت شکایت)',
  'میزان رضایت از خدمات دندان پزشکی',
  'میزان رضایت از پوشش های بیمه تکمیلی',
  'عملکرد شرکت بیمه البرز چگونه بوده است',
  'میزان رضایت شما از نحوه کارشناسی هزینه ها',
  'میزان رضایت از نحوه بارگزاری مدارک و هزینه ها(بصورت آنلاین)',
  'میزان رضایت در خصوص حذف فیزیکی هزینه ها',
];

const branchOptions = ['کرمان', 'تهران', 'تبریز'];

export default function Questionnaire() {
  const [form, setForm] = useState({
    phone: '',
    code: '',
    dependents: '',
    ...Object.fromEntries(questions.map((_, i) => [`q${i + 1}`, ''])),
    q17: '',
    q18: '',
    suggestions: '',
  });
  const [step, setStep] = useState(1);
  const [sendingCode, setSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [_verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Send SMS code (real backend)
  const sendCode = async () => {
    setSendingCode(true);
    setError('');
    try {
      const res = await fetch(API_ENDPOINTS.sendCode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone }),
      });
      const data = await res.json();
      if (data.success) {
        setCodeSent(true);
      } else {
        setError(data.message || 'خطا در ارسال کد');
      }
    } catch (_err) {
      setError('ارتباط با سرور برقرار نشد');
    }
    setSendingCode(false);
  };

  // Verify code (real backend)
  const verifyCode = async () => {
    setVerifying(true);
    setError('');
    try {
      const res = await fetch(API_ENDPOINTS.verifyCode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone, code: form.code }),
      });
      const data = await res.json();
      if (data.success) {
        setVerified(true);
        setStep(2);
        setSuccess('شماره تلفن تایید شد.');
      } else {
        setError(data.message || 'کد وارد شده صحیح نیست.');
      }
    } catch (err) {
      setError('ارتباط با سرور برقرار نشد');
    }
    setVerifying(false);
  };

  // Handle form field change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit questionnaire (real backend)
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(API_ENDPOINTS.submitQuestionnaire, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('پاسخ شما با موفقیت ثبت شد.');
        setStep(3);
      } else {
        setError(data.message || 'خطا در ثبت پاسخ');
      }
    } catch (err) {
      setError('ارتباط با سرور برقرار نشد');
    }
  };

  return (
    <div className='questionnaire-page'>
      <h2>پرسشنامه نظرسنجی قرارداد بیمه تکمیلی</h2>
      {step === 1 && (
        <form className='questionnaire-form' onSubmit={e => e.preventDefault()}>
          <label>شماره موبایل:</label>
          <input
            name='phone'
            type='tel'
            value={form.phone}
            onChange={handleChange}
            required
            pattern='09[0-9]{9}'
          />
          <button type='button' onClick={sendCode} disabled={sendingCode || !form.phone}>
            {sendingCode ? 'در حال ارسال...' : 'ارسال کد تایید'}
          </button>
          {codeSent && (
            <>
              <label>کد تایید:</label>
              <input
                name='code'
                type='text'
                value={form.code}
                onChange={handleChange}
                required
                maxLength={6}
              />
              <button type='button' onClick={verifyCode} disabled={verifying || !form.code}>
                {verifying ? 'در حال بررسی...' : 'تایید کد'}
              </button>
            </>
          )}
          {error && <div className='error'>{error}</div>}
          {success && <div className='success'>{success}</div>}
        </form>
      )}
      {step === 2 && (
        <form className='questionnaire-form' onSubmit={handleSubmit}>
          <label>
            تعداد افراد تحت تکفل: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            name='dependents'
            type='number'
            value={form.dependents}
            onChange={handleChange}
            min={0}
            max={20}
            required
          />
          {questions.map((q, i) => (
            <div className='question-block' key={i}>
              <label>{`${i + 1}. ${q}`}</label>
              <div className='options'>
                {[5, 10, 15, 20, 25].map(val => (
                  <label key={val}>
                    <input
                      type='radio'
                      name={`q${i + 1}`}
                      value={val}
                      checked={form[`q${i + 1}`] === String(val)}
                      onChange={handleChange}
                      required={i === 0}
                    />{' '}
                    {val}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className='question-block'>
            <label>17. آیا تمایل به تغییر شرکت بیمه البرز دارید؟</label>
            <div className='options'>
              <label>
                <input
                  type='radio'
                  name='q17'
                  value='بله'
                  checked={form.q17 === 'بله'}
                  onChange={handleChange}
                  required
                />{' '}
                بله
              </label>
              <label>
                <input
                  type='radio'
                  name='q17'
                  value='خیر'
                  checked={form.q17 === 'خیر'}
                  onChange={handleChange}
                />{' '}
                خیر
              </label>
            </div>
          </div>
          <div className='question-block'>
            <label>18. از بیشترین شعبه ای که استفاده میکنید کدام است؟</label>
            <select name='q18' value={form.q18} onChange={handleChange} required>
              <option value=''>انتخاب کنید...</option>
              {branchOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className='question-block'>
            <label>پیشنهادها و انتقادها:</label>
            <textarea
              name='suggestions'
              rows={3}
              value={form.suggestions}
              onChange={handleChange}
              placeholder='پیشنهادات خود را بنویسید'
            />
          </div>
          <button type='submit' className='submit-btn'>
            ارسال پاسخ ها
          </button>
          {error && <div className='error'>{error}</div>}
          {success && <div className='success'>{success}</div>}
        </form>
      )}
      {step === 3 && <div className='success'>پاسخ شما ثبت شد. با تشکر!</div>}
    </div>
  );
}
