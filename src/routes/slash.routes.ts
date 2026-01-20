import { Router } from "express";
import { prisma } from "../db/prisma";

export const slashRouter = Router();

/* CREATE */
slashRouter.post("/", async (req, res) => {
    const { title, detail } = req.body;

    const row = await prisma.data.create({
        data: {
            id: BigInt(Date.now()),
            title,
            detail
        }
    });

    res.json(row);
});

/* READ */
slashRouter.get("/", async (_, res) => {
    const rows = await prisma.data.findMany();
    res.json("hello");
});
