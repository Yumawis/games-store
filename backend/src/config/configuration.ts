export default () => ({
  port: parseInt(process.env.PORT ?? '4000', 10),
  databaseUrl:
    process.env.DATA_BASE_URL ?? 'mongodb://127.0.0.1:27017/games-store',
  jwt: {
    secret: process.env.JWT_SECRET ?? 'fallback-secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },
  cors: {
    allowedOrigins: process.env.ALLOWED_CORS?.split(',') ?? [
      'http://localhost:3000',
    ],
  },
});