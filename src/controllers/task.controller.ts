import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/task.service";
import HttpException from "../exceptions/httpException";
import { CreateTaskDTO } from "../dto/createTask.dto";
import { UpdateTaskDTO } from "../dto/updateTask.dto";

export class TasksController {
  private taskService: TaskService;
  constructor() {
    this.taskService = new TaskService();
    this.getAllTasks = this.getAllTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.getTaskById = this.getTaskById.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.send(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = +req.params.id;
      if (!taskId) throw new HttpException(400, "Bad request");

      const task = await this.taskService.getTaskById(taskId);
      if (!task) throw new HttpException(404, "Id not found");

      res.send(task);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateTaskDTO;
      const newTask = await this.taskService.createTask(dto);
      res.status(201).send(newTask);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = +req.params.id;
      if (!taskId) throw new HttpException(400, "Bad request");

      const body: CreateTaskDTO = req.body;
      const dto: UpdateTaskDTO = { ...body, id: taskId };
      const updatedTask = await this.taskService.updateTaskById(dto);
      res.send(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = +req.params.id;
      if (!taskId) throw new HttpException(400, "Bad request");
      
      await this.taskService.deleteTaskById(taskId);
      res.status(209).end();
    } catch (error) {
      next(error);
    }
  }
}
