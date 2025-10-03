import React from 'react';
import '../../styles/home/ServiceCard.css';

export default function ServiceCard({ title, text }) {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
