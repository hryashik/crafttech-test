import express from "express";
import { config } from "dotenv";
import tasksRouter from "./routers/tasksRouter";
import exceptionFilter from "./middlewares/exceptionFilter";

config();

const app = express();

app.use("/tasks",tasksRouter);
app.use(exceptionFilter);

const port = process.env.APP_PORT;
const server = app.listen(port, () =>
  console.log(`App starting on ${port} port`),
);

export default server;
