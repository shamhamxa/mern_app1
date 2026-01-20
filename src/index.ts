import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";
import { dataRouter } from "./routes/data.routes";

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

const app = express();

app.use(cors());
app.use(express.json());

/* ✅ HEALTH CHECK */
app.get("/", (_req, res) => {
    res.json({
        status: "ok",
        service: "Scriptloop API",
    });
});

app.use("/auth", authRouter);
app.use("/data", dataRouter);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
