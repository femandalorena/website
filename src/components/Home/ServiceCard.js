import React from 'react';

export default function ServiceCard({ title, text }) {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
