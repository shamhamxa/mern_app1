import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

/**
 * 🔥 Force a connection once so Node keeps an open handle
 * This fixes the nodemon clean-exit issue
 */
(async () => {
    try {
        const client = await pool.connect();
        console.log("PostgreSQL pool connected and open");
        client.release();
    } catch (err) {
        console.error("PostgreSQL connection error:");
        console.error(err);
    }
})();


const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
});
