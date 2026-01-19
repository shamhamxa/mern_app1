"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../db/prisma");
exports.authRouter = (0, express_1.Router)();
/* CREATE */
exports.authRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma_1.prisma.auth.create({
        data: {
            id: BigInt(Date.now()),
            username,
            password
        }
    });
    res.json({
        ...user,
        id: user.id.toString() // ✅ BigInt → string
    });
});
/* READ */
exports.authRouter.get("/", async (_, res) => {
    const users = await prisma_1.prisma.auth.findMany();
    res.json(users.map(user => ({
        ...user,
        id: user.id.toString() // ✅ BigInt → string
    })));
});
