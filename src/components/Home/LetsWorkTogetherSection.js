import React, { useState } from 'react';
import '../../styles/home/LetsWorkTogetherSection.css';

export default function LetsWorkTogetherSection({ t }) {
  const [isSendCV, setIsSendCV] = useState(false);

  return (
    <section className="screen-section work-together-section" id="workTogether">
      <div className="work-together-grid">
        <div className="work-info">
          <h2>{isSendCV ? t.employmentWithUs : t.hireOurServices}</h2>
          <button
            className="toggle-button"
            aria-pressed={isSendCV}
            onClick={() => setIsSendCV((prev) => !prev)}
            aria-label="Toggle between Hire Us and Send CV"
            type="button"
          >
            {isSendCV ? t.apply : t.hireUs}
          </button>
        </div>
        <form
          className="work-form"
          id="workForm"
          encType="multipart/form-data"
        >
          <h2>{t.workTogether}</h2>
          <label htmlFor="name">{t.name}</label>
          <input type="text" id="name" name="name" required placeholder={t.name} />
          <label htmlFor="email">{t.email}</label>
          <input type="email" id="email" name="email" required placeholder={t.email} />
          <label htmlFor="message">{t.message}</label>
          <textarea id="message" name="message" rows="4" required placeholder={t.message} />
          {isSendCV && (
            <div className="attachment-wrapper">
              <label htmlFor="attachment">{t.upload}</label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                accept=".pdf,.doc,.docx"
                required
              />
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
