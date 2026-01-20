"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = require("./routes/auth.routes");
const data_routes_1 = require("./routes/data.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* ✅ ROOT ROUTE */
app.get("/", (_req, res) => {
    res.json({
        status: "OK",
        app: "Scriptloop API",
        message: "Server is running 🚀"
    });
});
const a = "";
/* APIs */
app.use("/auth", auth_routes_1.authRouter);
app.use("/data", data_routes_1.dataRouter);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
