import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";
import { dataRouter } from "./routes/data.routes";
import { prisma } from "./db/prisma"; // ✅ move here

const app = express();

app.use(cors());
app.use(express.json());


/* ✅ ROOT ROUTE WITH DB CHECK */
app.get("/", async (_req, res) => {
    try {
        const result = await prisma.auth.findMany();
        console.log('AUTH RESULT:', result);

        const time = await prisma.$queryRaw`SELECT now()`;
        console.log('DB TIME:', time);

        await prisma.$queryRaw`SELECT 1`;

        res.json({
            status: "OK",
            app: "Scriptloop API",
            db: "CONNECTED ✅",
            message: "Server and database are running 🚀",
        });
    } catch (err) {
        console.error("DB CONNECTION FAILED:", err);

        res.status(200).json({
            status: "PARTIAL",
            app: "Scriptloop API",
            db: "DISCONNECTED ❌",
            message: "Server is running, database is not connected",
        });
    }
});

/* APIs */
app.use("/auth", authRouter);
app.use("/data", dataRouter);


const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} already in use`);
        process.exit(1);
    }
});
