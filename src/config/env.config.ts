const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || 'mysql://z3x9kcvbyezar961:cju8jtz5nsrumy7r@frwahxxknm9kwy6c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/rlfvrobhtf3907j0',
  jwt: {
    secret: process.env.JWT_SECRET || 'stackflowisnotasecret',
    expiry: process.env.JWT_EXPIRY || '7d'
  },
  redisUrl: process.env.REDIS_URL || 'redis://:pab9345bcce5dec6d7e838b755da3e3a304b3d2d4d9f4bed0e4b0241b0dd7c56f@ec2-54-152-2-171.compute-1.amazonaws.com:10019',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USER || 'harold.hettinger60@ethereal.email',
      pass: process.env.SMTP_PASSWORD || 'PG8sP7m6kUxq28b4fG'
    }
  },
};

export default config;