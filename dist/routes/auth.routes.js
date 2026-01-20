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
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Auth create failed" });
    }
});
exports.authRouter.get("/", async (_req, res) => {
    const users = await prisma_1.prisma.auth.findMany();
    res.json(users);
});
/* READ */
exports.authRouter.get("/", async (_req, res) => {
    try {
        const users = await prisma_1.prisma.auth.findMany();
        res.json(users.map(u => ({
            ...u,
            id: u.id.toString()
        })));
    }
    catch (err) {
        console.error("AUTH GET ERROR:", err);
        res.status(500).json({ error: "Auth fetch failed" });
    }
});
