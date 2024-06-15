import { enum_Tasks_status } from "@prisma/client";

export type UpdateTaskDTO = {
  id: number;
  title: string;
  description?: string;
  status?: enum_Tasks_status;
};
