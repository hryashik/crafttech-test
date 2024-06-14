import express from "express";
import tasksRouter from "./routers/tasksRouter";
import exceptionFilter from "./middlewares/exceptionFilter";
import { PrismaService } from "./prisma/prismaService";

const app = express();

app.use("/tasks", tasksRouter);
app.use(exceptionFilter);

const server = app.listen(process.env.PORT, () => console.log(`App starting on ${process.env.PORT} port`));

start();

async function start() {
  try {
    const prismaService = new PrismaService();
    await prismaService.$connect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default server;
