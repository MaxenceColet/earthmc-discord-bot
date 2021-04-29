module.exports = {
  apps: [
    {
      name: 'WORKERS_earthmc',
      script: '/app/earthmc-discord-bot/workers/dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      cwd: '/app/earthmc-discord-bot/workers',
    },
  ],
};
