import { PrismaClient } from '@prisma/client';

const isDev = process.env.NODE_ENV === 'development';

const prisma = new PrismaClient({
  log: isDev 
    ? [
        { level: 'query', emit: 'event' },
        { level: 'warn', emit: 'stdout' },
        { level: 'error', emit: 'stdout' }
      ]
    : [{ level: 'error', emit: 'stdout' }]
});

if (isDev) {
  prisma.$on('query', (e) => {
    let query = e.query
      .replace(/"public"\./g, '')
      .replace(/"/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    try {
      const params = JSON.parse(e.params);
      if (Array.isArray(params)) {
        params.forEach((param, index) => {
          const placeholder = `$${index + 1}`;
          let replacement = param;
          if (typeof param === 'string') {
            if (param.match(/^\d{4}-\d{2}-\d{2}/)) {
              replacement = `'${param.substring(0, 10)}'`; // Format timestamp to simple date
            } else {
              replacement = `'${param}'`;
            }
          }
          query = query.replace(placeholder, replacement);
        });
      }
    } catch (err) {
      // Ignore JSON parsing errors
    }

    console.log(`\x1b[36m[Prisma]\x1b[0m ${query} \x1b[90m(${e.duration}ms)\x1b[0m`);
  });
}

export default prisma;
