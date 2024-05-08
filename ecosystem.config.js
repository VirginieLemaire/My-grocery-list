module.exports = {
  apps : [{
    name: "grocery-list",
    script: "./node_modules/.bin/dotenvx",
    args: "run --env-file=.env.production -- node index.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "production"
    }
  }]
};