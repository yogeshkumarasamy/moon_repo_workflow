import React from 'react';
import { formatDate } from '@repo/utils';

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const today = formatDate(new Date());

  return (
    <header
      style={{
        padding: '16px 24px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      className="repo-header"
    >
      <div>
        <h1 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>{title}</h1>
        {subtitle && <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>{subtitle}</p>}
      </div>
      <div style={{ fontSize: '12px', color: '#94a3b8' }}>
        <span>Date: {today}</span>
      </div>
    </header>
  );
};
