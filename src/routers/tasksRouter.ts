import { Request, Router, Response } from "express";

const tasksRouter = Router();

tasksRouter.get("/", (req: Request, res: Response) => {
  res.status(201).send("HELLO!");
});

export default tasksRouter;
