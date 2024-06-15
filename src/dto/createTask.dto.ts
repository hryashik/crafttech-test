import { enum_Tasks_status } from "@prisma/client";

export type CreateTaskDTO = {
  title: string;
  description?: string;
  status?: enum_Tasks_status;
};
