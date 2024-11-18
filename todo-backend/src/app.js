import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import listRouter from "./routes/list.js";
import todoRouter from "./routes/todo.js"
import userRouter from "./routes/user.js"


const PORT = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);

app.use("/list", listRouter);
app.use("/list/:list_id/todo", todoRouter)

app.use("/healthcheck", (req, res) => {
  res.status(200).json({success: true});
})
app.use("*", (req, res) => {
  res.status(404).json({success: false, error: "Invalid Route"});
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({error: err.message.split("\n").join("")});
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
