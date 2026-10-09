import React, { useState } from 'react';
import { Header, Card, Button, Badge } from '@repo/ui';
import { formatDate, computeAverage } from '@repo/utils';
import type { User, SystemHealth } from '@repo/types';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 'usr_1', name: 'Alice Smith', email: 'alice@domain.com', role: 'admin', createdAt: '2026-01-15' },
    { id: 'usr_2', name: 'Bob Jones', email: 'bob@domain.com', role: 'user', createdAt: '2026-02-20' },
    { id: 'usr_3', name: 'Charlie Ray', email: 'charlie@domain.com', role: 'guest', createdAt: '2026-03-05' },
  ]);

  const systemHealth: SystemHealth = {
    status: 'healthy',
    uptimeSeconds: 84320,
    version: '1.0.0',
    service: 'admin-portal',
    timestamp: new Date().toISOString(),
  };

  const handleAddUser = () => {
    const id = `usr_${users.length + 1}`;
    setUsers([...users, { id, name: `New User ${id}`, email: `${id}@test.com`, role: 'user', createdAt: new Date().toISOString() }]);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', padding: '24px', background: '#f1f5f9', minHeight: '100vh' }}>
      <Header title="Internal Admin Portal" subtitle="Operations & Infrastructure Management" />
      <main style={{ marginTop: '24px', display: 'grid', gap: '20px', maxWidth: '900px' }}>
        <Card title="System Status" description="Core health check metrics">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Badge label={`Status: ${systemHealth.status.toUpperCase()}`} variant="success" />
            <span style={{ fontSize: '13px', color: '#64748b' }}>Uptime: {(systemHealth.uptimeSeconds / 3600).toFixed(1)} hrs</span>
          </div>
        </Card>

        <Card
          title={`Users (${users.length})`}
          description="Monitored users across the platform"
          footer={
            <Button variant="primary" onClick={handleAddUser}>
              + Add Mock User
            </Button>
          }
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {users.map((u) => (
              <li key={u.id} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{u.name}</strong> ({u.email})
                </div>
                <div>
                  <Badge label={u.role} variant={u.role === 'admin' ? 'warning' : 'info'} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </div>
  );
};
