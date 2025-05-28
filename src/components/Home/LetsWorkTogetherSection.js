import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import '../../styles/home/LetsWorkTogetherSection.css';

export default function LetsWorkTogetherSection({ t }) {

  const [isWorkingWithUs, setIsWorkingWithUs] = useState(true);
  const fileInputRef = useRef();

  const toggleMode = () => setIsWorkingWithUs(prev => !prev);
  const handleUploadClick = () => fileInputRef.current?.click();

  return (
    <section className={`work-together-section ${isWorkingWithUs ? 'apply-mode' : 'hire-mode'}`} id="workTogether">
      <h2 className="work-together">
        {isWorkingWithUs
          ? t.workWithUs
          : t.contact}
      </h2>
        <h2 className="work-form-title">{t.workTogether}</h2>
      <div className="work-together-grid">

        <div className="work-info yellow-bg">
          <h2 className="work-info-text">
            <span>{isWorkingWithUs ? t.employmentWithUs : t.hireOurServices}</span>
            <span>{isWorkingWithUs ? t.continueEmployment : t.continueHiring}</span>
            <span>{t.else}</span>
          </h2>
          <button
            className={`toggle-button ${isWorkingWithUs ? 'btn-blue' : 'btn-yellow'}`}
            onClick={toggleMode}
            aria-pressed={isWorkingWithUs}
            aria-label="Toggle between Contact Us and Work with Us"
            type="button"
          >
            {isWorkingWithUs ? t.hireUs : t.apply}
          </button>
        </div>

        <form
          className={`work-form ${isWorkingWithUs ? 'applying' : 'hiring'}`}
          id="workForm"
          encType="multipart/form-data"
          onSubmit={e => e.preventDefault()}
        >
          <label htmlFor="name">{t.name}</label>
          <input type="text" id="name" name="name" required placeholder={t.name} />

          <label htmlFor="email">{t.email}</label>
          <input type="email" id="email" name="email" required placeholder={t.email} />

          <label htmlFor="message">{t.message}</label>
          <textarea id="message" name="message" rows="4" required placeholder={t.message} />

          {/* Show CV upload only when working with us */}
          {isWorkingWithUs && (
            <div className="attachment-wrapper">
              <input
                type="file"
                id="attachment"
                name="attachment"
                accept=".pdf,.doc,.docx"
                required
                ref={fileInputRef}
                hidden
              />
              <button
                type="button"
                className="custom-upload-btn"
                onClick={handleUploadClick}
                aria-label={t.upload}
              >
                <UploadCloud size={20} />
                {t.upload}
              </button>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {t.send}
          </button>
        </form>
      </div>
    </section>
  );
}
