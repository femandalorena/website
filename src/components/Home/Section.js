import React from 'react';

export default function Section({ id, title, content, alt }) {
  return (
    <section className={`screen-section ${alt ? 'alt' : ''}`} id={id}>
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
}
