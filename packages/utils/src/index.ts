import type { User, CreateUserDto, SystemHealth, ApiResponse } from '@repo/types';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function computeAverage(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Number((sum / values.length).toFixed(2));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateUser(dto: CreateUserDto): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!dto.name || dto.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  if (!dto.email || !dto.email.includes('@')) {
    errors.push('Email must be a valid email address');
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function createApiResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

export function createHealthCheck(serviceName: string, startTime: number): SystemHealth {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  return {
    status: 'healthy',
    uptimeSeconds,
    version: '1.0.0',
    service: serviceName,
    timestamp: new Date().toISOString(),
  };
}

export class Logger {
  constructor(private context: string) {}

  info(message: string, meta?: Record<string, unknown>) {
    console.log(`[INFO][${this.context}]: ${message}`, meta ? JSON.stringify(meta) : '');
  }

  error(message: string, error?: unknown) {
    console.error(`[ERROR][${this.context}]: ${message}`, error);
  }
}
