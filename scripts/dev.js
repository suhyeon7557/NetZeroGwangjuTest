#!/usr/bin/env node
const { spawn } = require('child_process');
const net = require('net');
const path = require('path');

const candidatePorts = [3001, 3003, 3005, 3007, 3009];

function isPortFree(port) {
  return new Promise((resolve) => {
    const tester = net
      .createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        tester.close(() => resolve(true));
      })
      .listen(port, '0.0.0.0');
  });
}

async function findAvailablePort() {
  for (const port of candidatePorts) {
    // eslint-disable-next-line no-await-in-loop
    const free = await isPortFree(port);
    if (free) return port;
  }
  return null;
}

async function main() {
  const port = await findAvailablePort();
  if (!port) {
    console.error(`No free port found from: ${candidatePorts.join(', ')}`);
    process.exit(1);
  }

  // Use Node to execute Next CLI directly to avoid .cmd spawn issues on Windows
  const nextBin = require.resolve('next/dist/bin/next');
  const args = [nextBin, 'dev', '--turbopack', '-p', String(port)];
  console.log(`Starting Next.js on port ${port} ...`);

  const child = spawn(process.execPath, args, { stdio: 'inherit' });

  const handleExit = () => {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
    process.exit();
  };
  process.on('SIGINT', handleExit);
  process.on('SIGTERM', handleExit);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


