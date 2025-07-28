import { prisma } from '@/utils';

const main = async () => {
  await prisma.user.create({
    data: {
      username: 'admin',
      password: '123456',
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
