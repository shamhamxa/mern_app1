"use strict";
// import express from "express";
// import cors from "cors";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = require("./routes/auth.routes");
const data_routes_1 = require("./routes/data.routes");
BigInt.prototype.toJSON = function () {
    return this.toString();
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // 🔥 MUST BE BEFORE ROUTES
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.authRouter);
app.use("/data", data_routes_1.dataRouter);
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
