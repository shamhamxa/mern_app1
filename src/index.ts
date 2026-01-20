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

/* ✅ ROOT ROUTE */
app.get("/", (_req, res) => {
    res.json({
        status: "OK",
        app: "Scriptloop API",
        message: "Server is running 🚀"
    });
});

/* APIs */
app.use("/auth", authRouter);
app.use("/data", dataRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
