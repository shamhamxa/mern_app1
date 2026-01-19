"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../db/prisma");
exports.dataRouter = (0, express_1.Router)();
/* CREATE */
exports.dataRouter.post("/", async (req, res) => {
    const { title, detail } = req.body;
    const row = await prisma_1.prisma.data.create({
        data: {
            id: BigInt(Date.now()),
            title,
            detail
        }
    });
    res.json(row);
});
/* READ */
exports.dataRouter.get("/", async (_, res) => {
    const rows = await prisma_1.prisma.data.findMany();
    res.json(rows);
});
