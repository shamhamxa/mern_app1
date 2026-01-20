import { Router } from "express";
import { prisma } from "../db/prisma";

export const authRouter = Router();

/* CREATE */
authRouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.auth.create({
            data: { username, password },
        });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Auth create failed" });
    }
});

authRouter.get("/", async (_req, res) => {
    const users = await prisma.auth.findMany();
    res.json(users);
});



/* READ */
authRouter.get("/", async (_req, res) => {
    try {
        const users = await prisma.auth.findMany();
        res.json(
            users.map(u => ({
                ...u,
                id: u.id.toString()
            }))
        );
    } catch (err) {
        console.error("AUTH GET ERROR:", err);
        res.status(500).json({ error: "Auth fetch failed" });
    }
});

