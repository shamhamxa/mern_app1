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

        res.json({ ...user, id: user.id.toString() });
    } catch (e) {
        console.error("AUTH POST ERROR:", e);
        res.status(500).json({ error: "Auth create failed" });
    }
});

/* READ */
authRouter.get("/", async (_req, res) => {
    try {
        const users = await prisma.auth.findMany();

        res.json(

            users.map(u => ({
                ...u,
                id: u.id.toString(),
            }))
        );

    } catch (e) {
        console.error("DB ERROR:", e);
        res.status(500).json({ error: "Database connection failed" });
    }
});
