import { CreateTaskDTO } from "../dto/createTask.dto";
import { UpdateTaskDTO } from "../dto/updateTask.dto";

export abstract class BaseRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: number): Promise<T | null>;
  abstract create(dto: CreateTaskDTO): Promise<T>;
  abstract update(dto: UpdateTaskDTO): Promise<T>;
  abstract delete(id: number): Promise<T>;
}
