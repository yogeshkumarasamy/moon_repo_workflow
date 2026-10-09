export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  role?: 'admin' | 'user' | 'guest';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptimeSeconds: number;
  version: string;
  service: string;
  timestamp: string;
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  tags?: Record<string, string>;
}

export interface TaskPayload {
  taskId: string;
  action: 'sync' | 'index' | 'notify' | 'cleanup';
  data: Record<string, unknown>;
  enqueuedAt: string;
}

export interface TaskResult {
  taskId: string;
  status: 'completed' | 'failed';
  durationMs: number;
  output?: Record<string, unknown>;
  error?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
