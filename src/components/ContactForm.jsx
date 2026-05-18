import { useState } from 'react';

const API_BASE = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('172'))
  ? 'http://172.20.10.3:5001/api'
  : `${window.location.origin}/api`;

function ContactForm({ t, language = 'az' }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg(language === 'az' ? 'Bütün sahələr tələb olunur' : language === 'en' ? 'All fields are required' : 'Все поля обязательны');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg(language === 'az' ? 'Etibarlı email daxil edin' : language === 'en' ? 'Please enter a valid email' : 'Пожалуйста, введите действительный адрес электронной почты');
      return;
    }

    setLoading(true);

    try {
      // For anonymous submissions (no user logged in), create a message with guest info
      const messageContent = `📧 ${fullName}\n📱 ${phone}\n✉️ ${email}\n\n📋 ${subject}\n\n${message}`;

      // First, check if user is logged in
      const authToken = localStorage.getItem('token');
      
      if (authToken) {
        // User is logged in, submit via authenticated endpoint
        const response = await fetch(`${API_BASE}/support/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            message: messageContent,
            source: 'web',
          }),
        });

        const data = await response.json();
        if (!data.success) {
          setErrorMsg(data.message || (language === 'az' ? 'Xəta baş verdi' : language === 'en' ? 'An error occurred' : 'Произошла ошибка'));
          return;
        }
      } else {
        // User not logged in - submit as guest contact
        // For now, we'll show a message to login or submit via email
        // In production, you might want to create a guest submission endpoint
        const response = await fetch(`${API_BASE}/support/contact/guest`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            subject,
            message,
            source: 'web',
          }),
        });

        const data = await response.json();
        if (!data.success) {
          setErrorMsg(data.message || (language === 'az' ? 'Xəta baş verdi' : language === 'en' ? 'An error occurred' : 'Произошла ошибка'));
          return;
        }
      }

      setSuccessMsg(language === 'az' ? 'Mesaj göndərildi! Tezliklə sizinlə əlaqə saxlanacağıq.' : language === 'en' ? 'Message sent! We will contact you soon.' : 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setErrorMsg(language === 'az' ? 'Şəbəkə xətası' : language === 'en' ? 'Network error' : 'Ошибка сети');
      console.error('Error submitting contact form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fullName">
          {language === 'az' ? 'Ad Soyad' : language === 'en' ? 'Full Name' : 'Полное имя'}
        </label>
        <input
          id="fullName"
          type="text"
          placeholder={language === 'az' ? 'Ad və soyad' : language === 'en' ? 'Your full name' : 'Ваше полное имя'}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">
          {language === 'az' ? 'Email' : language === 'en' ? 'Email' : 'Электронная почта'}
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">
          {language === 'az' ? 'Telefon' : language === 'en' ? 'Phone' : 'Телефон'}
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+994 50 123 45 67"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="subject">
          {language === 'az' ? 'Mövzu' : language === 'en' ? 'Subject' : 'Тема'}
        </label>
        <input
          id="subject"
          type="text"
          placeholder={language === 'az' ? 'Mövzunu qısa təsvir edin' : language === 'en' ? 'Brief subject' : 'Кратко опишите тему'}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group form-group-full">
        <label htmlFor="message">
          {language === 'az' ? 'Mesaj' : language === 'en' ? 'Message' : 'Сообщение'}
        </label>
        <textarea
          id="message"
          placeholder={language === 'az' ? 'Mesajınızı yazın...' : language === 'en' ? 'Your message...' : 'Напишите ваше сообщение...'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          rows="6"
        />
      </div>

      {errorMsg && <div className="form-error form-group-full">{errorMsg}</div>}
      {successMsg && <div className="form-success form-group-full">{successMsg}</div>}

      <button
        type="submit"
        className="form-submit form-group-full"
        disabled={loading}
      >
        {loading
          ? (language === 'az' ? 'Göndərilir...' : language === 'en' ? 'Sending...' : 'Отправка...')
          : (language === 'az' ? 'Göndər' : language === 'en' ? 'Send' : 'Отправить')}
      </button>
    </form>
  );
}

export default ContactForm;
