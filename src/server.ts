import 'dotenv/config';
import app from './app';
import { prisma } from './prisma/client';

const PORT = Number(process.env.PORT) || 3000;

async function main() {
  await prisma.$connect();

  app.listen(PORT, () => {
    console.log(`PaperFlow API running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

main().catch(async (error) => {
  console.error('Failed to start server:', error);
  await prisma.$disconnect();
  process.exit(1);
});
