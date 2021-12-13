const config = {
  host: process.env.HOST || 'http://localhost:3333',
  port: process.env.PORT || 3333,
  databaseUrl: process.env.JAWSDB_URL || 'mysql://user:pass@localhost:3306/test',
  jwt: {
    secret: process.env.JWT_SECRET || 'nosecret',
    expiry: process.env.JWT_EXPIRY || '30d'
  },
  redisUrl: process.env.REDIS_URL || '',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USER || 'test@example.com',
      pass: process.env.SMTP_PASSWORD || 'invalid'
    }
  },
};

export default config;