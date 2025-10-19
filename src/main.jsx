import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import Questionnaire from './pages/Questionnaire.jsx';
import BlogPage from './components/BlogPage.jsx';
import BlogPostPage from './components/BlogPostPage.jsx';
import ResumeBuilder from './components/ResumeBuilder.jsx';
import PublicResumePage from './components/PublicResumePage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/questionnaire' element={<Questionnaire />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/blog/:id' element={<BlogPostPage />} />
          <Route path='/resume-builder' element={<ResumeBuilder />} />
          <Route path='/resume/:resumeId' element={<PublicResumePage />} />
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
