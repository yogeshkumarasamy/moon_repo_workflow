import { createServer } from './server.js';

const PORT = process.env.PORT || 3000;
const server = createServer();

server.listen(PORT, () => {
  console.log(`API Server listening on port ${PORT}`);
});
