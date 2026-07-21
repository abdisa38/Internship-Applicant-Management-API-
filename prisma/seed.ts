import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create a default admin
  const adminEmail = 'admin@infnova.tech';
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
      },
    });
    console.log('Seeded default admin user: admin@infnova.tech / password123');
  } else {
    console.log('Default admin already exists.');
  }

  // Seed sample applicants
  const applicants = [
    {
      firstName: 'Alice',
     a        email: 'alice.smith@example.com',
      phone: '123-456-7890',
      track: 'Frontend Development',
      status: 'Pending',
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      track: 'Backend Development',
      status: 'Shortlisted',
      notes: 'Strong Node.js skills.',
    },
  ];

  for (const app of applicants) {
    const existingApp = await prisma.applicant.findUnique({
      where: { email: app.email },
    });
    if (!existingApp) {
      await prisma.applicant.create({
        data: app,
      });
    }
  }
  console.log('Seeded initial applicants.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
