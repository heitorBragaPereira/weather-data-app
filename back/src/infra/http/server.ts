import express from "express";
import http from "http";
import router from "./routes.js";
import WSServer from "../ws/server.js";

const app = express();
app.use(express.json());
app.use("/", router);

const server = http.createServer(app);

// 🔥 WebSocket acoplado ao HTTP
export const wsServer = new WSServer(server);

export default server;
