// scripts/seedData.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateRandomDescription(length: number): string {
  const words = [
    'implement',
    'design',
    'review',
    'fix',
    'test',
    'analyze',
    'debug',
    'refactor',
    'deploy',
    'integrate',
    'document',
    'schedule',
    'plan',
    'execute',
    'monitor',
    'update',
    'optimize',
    'research',
    'validate',
    'configure',
    'develop',
    'create',
  ];
  const result: string[] = [];
  while (result.join(' ').length < length) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join(' ').slice(0, length).trim() + '.';
}

async function seed(userId: string) {
  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) {
    const allUsers = await prisma.users.findMany();
    console.log('All users:', allUsers);
    throw new Error(`User with ID ${userId} not found`);
  }

  // @ts-ignore
  console.log(`Using existing user: ${user.name || user.email}`);

  const project = await prisma.projects.create({
    data: {
      name: 'Test Project',
      emoji: '📋',
      color: '#FF5733',
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const tasks = [
    // Overdue
    { title: 'Overdue Task', deadline: new Date('2025-04-10'), count: 4 },
    { title: 'Overdue Task', deadline: new Date('2025-04-11'), count: 5 },
    // Today
    { title: 'Today Task', deadline: new Date('2025-04-12'), count: 3 },
    // Tomorrow
    { title: 'Tomorrow Task', deadline: new Date('2025-04-13'), count: 2 },
    // This Week
    { title: 'This Week Task', deadline: new Date('2025-04-14'), count: 4 },
    { title: 'This Week Task', deadline: new Date('2025-04-15'), count: 5 },
    // Next Week
    { title: 'Next Week Task', deadline: new Date('2025-04-20'), count: 4 },
    // May 2025
    { title: 'May Task', deadline: new Date('2025-05-01'), count: 2 },
    { title: 'May Task', deadline: new Date('2025-05-15'), count: 3 },
    // June 2025
    { title: 'June Task', deadline: new Date('2025-06-10'), count: 2 },
    // No Deadline
    { title: 'No Deadline Task', deadline: null, count: 3 },
  ];

  for (const task of tasks) {
    await Promise.all(
      Array.from({ length: task.count }).map((_, i) =>
        prisma.tasks.create({
          data: {
            title: `${task.title} ${i + 1}`,
            description: generateRandomDescription(50),
            deadline: task.deadline,
            progress: Math.floor(Math.random() * 101),
            priority: Math.floor(Math.random() * 4) + 1,
            projectId: project.id,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }),
      ),
    );
  }

  console.log('Seeding completed successfully!');
}

async function main() {
  const userId: string | undefined = process.argv[2];

  if (!userId) {
    console.error('Please provide a userId as an argument: pnpm data:seed <userId>');
    process.exit(1);
  }

  await seed(userId);
}

main()
  .catch(e => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
