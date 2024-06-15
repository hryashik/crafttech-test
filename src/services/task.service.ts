import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateTaskDTO } from "../dto/createTask.dto";
import { UpdateTaskDTO } from "../dto/updateTask.dto";
import { TaskRepository } from "../repositories/taskRepository";
import HttpException from "../exceptions/httpException";
import { InternalServerError } from "../exceptions/internalServerError";

export class TaskService {
  private taskRepository: TaskRepository;
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  getAllTasks() {
    return this.taskRepository.findAll();
  }

  getTaskById(id: number) {
    return this.taskRepository.findById(id);
  }

  createTask(dto: CreateTaskDTO) {
    return this.taskRepository.create(dto);
  }

  updateTaskById(dto: UpdateTaskDTO) {
    return this.taskRepository.update(dto);
  }

  async deleteTaskById(id: number) {
    try {
      return await this.taskRepository.delete(id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(404, "Task is not exist");
      } else {
        throw new InternalServerError();
      }
    }
  }
}