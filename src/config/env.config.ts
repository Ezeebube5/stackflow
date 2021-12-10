const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || 'mysql://z3x9kcvbyezar961:cju8jtz5nsrumy7r@frwahxxknm9kwy6c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/rlfvrobhtf3907j0',
  jwt: {
    secret: process.env.JWT_SECRET || 'stackflowisnotasecret',
    expiry: process.env.JWT_EXPIRY || '7d'
  }
};

export default config;