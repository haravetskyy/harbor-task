import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.tasks.deleteMany({});
  console.log('All tasks deleted.');

  await prisma.projects.deleteMany({});
  console.log('All projects deleted.');

  await prisma.users.deleteMany({});
  console.log('All users deleted.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
