import { Router } from "express";
import { prisma } from "../db/prisma";

export const authRouter = Router();

/* CREATE */
authRouter.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.auth.create({
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
authRouter.get("/", async (_, res) => {
    const users = await prisma.auth.findMany();

    res.json(
        users.map(user => ({
            ...user,
            id: user.id.toString() // ✅ BigInt → string
        }))
    );
});
