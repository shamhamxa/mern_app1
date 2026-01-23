"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = require("./routes/auth.routes");
const data_routes_1 = require("./routes/data.routes");
const prisma_1 = require("./db/prisma"); // ✅ move here
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* ✅ ROOT ROUTE WITH DB CHECK */
app.get("/", async (_req, res) => {
    try {
        const result = await prisma_1.prisma.auth.findMany();
        console.log('AUTH RESULT:', result);
        const time = await prisma_1.prisma.$queryRaw `SELECT now()`;
        console.log('DB TIME:', time);
        await prisma_1.prisma.$queryRaw `SELECT 1`;
        res.json({
            status: "OK",
            app: "Scriptloop API",
            db: "CONNECTED ✅",
            message: "Server and database are running 🚀",
        });
    }
    catch (err) {
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
app.use("/auth", auth_routes_1.authRouter);
app.use("/data", data_routes_1.dataRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
