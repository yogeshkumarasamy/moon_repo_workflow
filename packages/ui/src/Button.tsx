import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const styles: Record<string, string> = {
    primary: 'background: #2563eb; color: white; border: none; border-radius: 6px;',
    secondary: 'background: #e2e8f0; color: #1e293b; border: 1px solid #cbd5e1; border-radius: 6px;',
    danger: 'background: #dc2626; color: white; border: none; border-radius: 6px;',
  };

  const sizes: Record<string, string> = {
    sm: 'padding: 4px 8px; font-size: 12px;',
    md: 'padding: 8px 16px; font-size: 14px;',
    lg: 'padding: 12px 24px; font-size: 16px;',
  };

  return (
    <button
      data-testid="repo-button"
      style={{
        cursor: 'pointer',
        fontWeight: 500,
        ...props.style,
      }}
      className={`repo-button ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
