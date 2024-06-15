import { Request, Router, Response } from "express";
import { TasksController } from "../controllers/task.controller";
import { validateCreateTask } from "../middlewares/validations/createTaskValidate";
import { validateUpdateTask } from "../middlewares/validations/updateTaskValidate";

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get("/", tasksController.getAllTasks);
tasksRouter.get("/:id", tasksController.getTaskById);
tasksRouter.post("/", validateCreateTask, tasksController.createTask);
tasksRouter.put("/:id", validateUpdateTask, tasksController.updateTask);
tasksRouter.delete("/:id", tasksController.deleteTask);

export default tasksRouter;
