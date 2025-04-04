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

async function main() {
  const user = await prisma.users.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      emailVerified: true,
      image: 'https://avatars.githubusercontent.com/u/56477764?v=4',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(`Created user: ${user.name}`);

  const projectNames = [
    'Website Redesign',
    'Marketing Campaign',
    'Mobile App Development',
    'Data Analytics Platform',
    'E-commerce Integration',
  ];

  await Promise.all(
    projectNames.slice(0, Math.floor(Math.random() * 2) + 3).map(async (name, index) => {
      const project = await prisma.projects.create({
        data: {
          name,
          emoji: ['🌐', '📈', '📱', '📊', '🛒'][index],
          color: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A6'][index],
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log(`Created project: ${project.name}`);

      const taskCount = Math.floor(Math.random() * 6) + 5;
      await Promise.all(
        Array.from({ length: taskCount }).map(async (_, taskIndex) => {
          const descriptionLength = Math.floor(Math.random() * (200 - 35 + 1)) + 35;
          const task = await prisma.tasks.create({
            data: {
              title: `${
                ['Implement', 'Design', 'Fix', 'Test', 'Analyze'][Math.floor(Math.random() * 5)]
              } ${project.name} feature ${taskIndex + 1}`,
              description: generateRandomDescription(descriptionLength),
              deadline: new Date(Date.now() + taskIndex * 1000 * 60 * 60 * 24),
              progress: Math.floor(Math.random() * 101),
              priority: Math.floor(Math.random() * 5) + 1,
              projectId: project.id,
              userId: user.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
          console.log(`  Created task: ${task.title}`);
        }),
      );
    }),
  );

  console.log('Seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
