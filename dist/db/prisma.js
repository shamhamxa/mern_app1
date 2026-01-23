"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const client_1 = require("@prisma/client");
const pool = new pg_1.Pool({
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
    }
    catch (err) {
        console.error("PostgreSQL connection error:");
        console.error(err);
    }
})();
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = new client_1.PrismaClient({ adapter });
process.on("SIGINT", async () => {
    await exports.prisma.$disconnect();
    await pool.end();
    process.exit(0);
});
const shutdown = async () => {
    await exports.prisma.$disconnect();
    await pool.end();
    process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
