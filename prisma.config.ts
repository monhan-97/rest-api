import path from 'node:path';

import type { PrismaConfig } from 'prisma';

const prismaConfig: PrismaConfig = {
  earlyAccess: true,
  schema: path.join('prisma'),
};

export default prismaConfig;
