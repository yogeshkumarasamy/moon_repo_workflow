import React from 'react';

export interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'info' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'info' }) => {
  const colors: Record<string, { bg: string; text: string }> = {
    success: { bg: '#dcfce7', text: '#15803d' },
    warning: { bg: '#fef9c3', text: '#a16207' },
    info: { bg: '#e0f2fe', text: '#0369a1' },
    error: { bg: '#fee2e2', text: '#b91c1c' },
  };

  const current = colors[variant] || colors.info;

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor: current.bg,
        color: current.text,
      }}
      className={`repo-badge repo-badge-${variant}`}
    >
      {label}
    </span>
  );
};
