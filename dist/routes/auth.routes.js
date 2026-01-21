"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../db/prisma");
exports.authRouter = (0, express_1.Router)();
/* CREATE */
exports.authRouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma_1.prisma.auth.create({
            data: { username, password },
        });
        res.json({ ...user, id: user.id.toString() });
    }
    catch (e) {
        console.error("AUTH POST ERROR:", e);
        res.status(500).json({ error: "Auth create failed" });
    }
});
/* READ */
exports.authRouter.get("/", async (_req, res) => {
    try {
        const users = await prisma_1.prisma.auth.findMany();
        res.json(users.map(u => ({
            ...u,
            id: u.id.toString(),
        })));
    }
    catch (e) {
        console.error("DB ERROR:", e);
        res.status(500).json({ error: "Database connection failed" });
    }
});
