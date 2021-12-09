const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'mysql://localhost:3306',
    jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  }
};

export default config;