import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.auth.create({
        data: {
            username: "admin",
            password: "admin123",
        },
    });

    console.log("✅ Seed data inserted");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


