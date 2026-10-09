import http from 'node:http';
import type { User, CreateUserDto, SystemHealth } from '@repo/types';
import { createApiResponse, createHealthCheck, validateUser, Logger } from '@repo/utils';

const logger = new Logger('API-Server');
const startTime = Date.now();

const usersDb: User[] = [
  { id: 'usr_1', name: 'Alice', email: 'alice@example.com', role: 'admin', createdAt: '2026-01-01' },
];

export function createServer(): http.Server {
  return http.createServer((req, res) => {
    const { url, method } = req;
    res.setHeader('Content-Type', 'application/json');

    if (method === 'GET' && url === '/health') {
      const health: SystemHealth = createHealthCheck('api-service', startTime);
      res.writeHead(200);
      res.end(JSON.stringify(health));
      return;
    }

    if (method === 'GET' && url === '/users') {
      res.writeHead(200);
      res.end(JSON.stringify(createApiResponse(usersDb)));
      return;
    }

    if (method === 'POST' && url === '/users') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const dto: CreateUserDto = JSON.parse(body);
          const validation = validateUser(dto);
          if (!validation.isValid) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, errors: validation.errors }));
            return;
          }
          const newUser: User = {
            id: `usr_${usersDb.length + 1}`,
            name: dto.name,
            email: dto.email,
            role: dto.role || 'user',
            createdAt: new Date().toISOString(),
          };
          usersDb.push(newUser);
          logger.info(`User created: ${newUser.id}`);
          res.writeHead(201);
          res.end(JSON.stringify(createApiResponse(newUser, 'User created successfully')));
        } catch {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
        }
      });
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  });
}
