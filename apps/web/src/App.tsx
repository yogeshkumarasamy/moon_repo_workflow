import React, { useState } from 'react';
import { Header, Card, Button, Badge } from '@repo/ui';
import { formatDate, formatCurrency, computeAverage } from '@repo/utils';
import type { User } from '@repo/types';

export const App: React.FC = () => {
  const [balance, setBalance] = useState(1500);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sampleUser: User = {
    id: 'usr_1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  const activityAmounts = [120, 45, 80, 210];
  const avgSpend = computeAverage(activityAmounts);

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        background: isDarkMode ? '#0f172a' : '#f8fafc',
        color: isDarkMode ? '#f8fafc' : '#0f172a',
        minHeight: '100vh',
        transition: 'background 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header title="Customer Web Portal" subtitle="Moon Repo Sample Application" />
      </div>
      <div style={{ marginTop: '12px' }}>
        <Button variant="secondary" onClick={() => setIsDarkMode(!isDarkMode)}>
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </div>
      <main style={{ marginTop: '24px', display: 'grid', gap: '20px', maxWidth: '800px' }}>
        <Card title="User Profile" description="Your registered account information">
          <p><strong>Name:</strong> {sampleUser.name}</p>
          <p><strong>Email:</strong> {sampleUser.email}</p>
          <p><strong>Member Since:</strong> {formatDate(sampleUser.createdAt)}</p>
          <Badge label={`Role: ${sampleUser.role}`} variant="info" />
        </Card>

        <Card title="Wallet & Transactions" description="Current balance and spending summary">
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>
            {formatCurrency(balance)}
          </p>
          <p>Average transaction spend: {formatCurrency(avgSpend)}</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <Button variant="primary" onClick={() => setBalance((b) => b + 100)}>
              Deposit $100
            </Button>
            <Button variant="secondary" onClick={() => setBalance((b) => Math.max(0, b - 50))}>
              Spend $50
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};
