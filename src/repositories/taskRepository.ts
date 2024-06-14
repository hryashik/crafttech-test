import { BaseRepository } from "./baseRepository";
import { PrismaService } from "../prisma/prismaService";
import { Tasks as Task } from "@prisma/client";
import { CreateTaskDTO } from "../dto/createTask.dto";
import { UpdateTaskDTO } from "../dto/updateTask.dto";

export class TaskRepository extends BaseRepository<Task> {
  private readonly prisma: PrismaService;
  constructor() {
    super();
    this.prisma = new PrismaService();
  }
  findAll() {
    return this.prisma.tasks.findMany();
  }
  findById(id: number) {
    return this.prisma.tasks.findUnique({ where: { id } });
  }
  create(dto: CreateTaskDTO) {
    return this.prisma.tasks.create({ data: dto });
  }
  update(dto: UpdateTaskDTO) {
    return this.prisma.tasks.update({
      where: { id: dto.id },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
      },
    });
  }
  delete(id: number) {
    return this.prisma.tasks.delete({ where: { id } });
  }
}
