// import express from "express";
// import cors from "cors";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (_req, res) => {
//     res.send("ALIVE");
// });

// setInterval(() => {
//     console.log("still alive");
// }, 3000);

// app.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });


import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";
import { dataRouter } from "./routes/data.routes";

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

const app = express();

app.use(cors());               // 🔥 MUST BE BEFORE ROUTES
app.use(express.json());

app.use("/auth", authRouter);
app.use("/data", dataRouter);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
