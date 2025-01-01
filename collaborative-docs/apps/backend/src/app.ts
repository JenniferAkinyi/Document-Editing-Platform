import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.router";
import documentRouter from "./routes/document.router";
import commentRouter from "./routes/comment.router";
import { Server} from "socket.io";
import http from "http";


dotenv.config();

const app = express();

const server = http.createServer(app);
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('send-changes', delta => {
    console.log(delta);
  });
});

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || "defaultSecretKey"));

app.use("/users", userRouter);
app.use("/documents", documentRouter);
app.use("/comments", commentRouter);

export default app;
