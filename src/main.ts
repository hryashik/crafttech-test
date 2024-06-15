import express from "express";
import tasksRouter from "./routers/tasksRouter";
import exceptionFilter from "./middlewares/exceptionFilter";
import { PrismaService } from "./prisma/prismaService";

const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);
app.use(exceptionFilter);

const port = process.env.APP_PORT;
const server = app.listen(port, () => console.log(`App starting on ${port} port`));

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
