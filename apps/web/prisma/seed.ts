import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialUsers: Prisma.UserCreateInput[] = [
  { email: "admin@rc-cargo.com", name: "Admin", role: "ADMIN", uid: "2345678" },
  {
    email: "conductor1@gmail.com",
    name: "Conductor 1",
    role: "DRIVER",
    uid: "3456789",
  },
  {
    email: "conductor2@gmail.com",
    name: "Conductor 2",
    role: "DRIVER",
    uid: "4567890",
  },
  {
    email: "company@gmail.com",
    name: "Empresa 1",
    role: "COMPANY_ADMIN",
    uid: "567891",
  },
  {
    email: "company_user@gmail.com",
    name: "Empresa 1 User",
    role: "COMPANY_USER",
    uid: "678912",
  },
];

const initialDrivers: Prisma.DriverCreateInput[] = [
  {
    user: {
      connect: { email: "conductor1@gmail.com" },
    },
  },
  {
    user: {
      connect: { email: "conductor2@gmail.com" },
    },
  },
];

async function main() {
  console.log("Start seeding...");

  for (const user of initialUsers) {
    const newUser = await prisma.user.upsert({
      create: user,
      update: user,
      where: { email: user.email },
    });
    console.log(`Created User with id: ${newUser?.id}`);
  }

  for (const driver of initialDrivers) {
    const newDriver = await prisma.driver.create({ data: driver });
    console.log(`Created Driver with id: ${newDriver?.id}`);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
