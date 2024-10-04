import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import listRouter from "./routes/list.js";
import todoRouter from "./routes/todo.js"
import userRouter from "./routes/user.js"
import { verifyToken } from './middleware/auth.js';

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);

app.use("/list", listRouter);
app.use("/list/:list_id/todo", todoRouter)

app.use("*", (req, res) => {
  res.status(404).json({success: false, error: "Invalid Route"});
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
