import React from 'react';

export interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, children, footer }) => {
  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '16px',
        background: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
      className="repo-card"
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#0f172a' }}>{title}</h3>
      {description && <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '14px' }}>{description}</p>}
      <div style={{ marginTop: '8px' }}>{children}</div>
      {footer && <div style={{ marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>{footer}</div>}
    </div>
  );
};
