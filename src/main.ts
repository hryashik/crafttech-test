import express from "express";
import tasksRouter from "./routers/tasksRouter";
import exceptionFilter from "./middlewares/exceptionFilter";
import prisma from "./prisma/prisma";

const app = express();

app.use("/tasks", tasksRouter);
app.use(exceptionFilter);

const port = process.env.APP_PORT;
const server = app.listen(port, () =>
  console.log(`App starting on ${port} port`),
);

init_app();

async function init_app() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default server;
