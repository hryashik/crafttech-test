import { Request, Response } from "express";
import HttpException from "../exceptions/httpException";

function exceptionFilter(err: Error, req: Request, res: Response) {
  if (err instanceof HttpException) {
    res.status(err.statusCode).send({ error: err.message });
  } else {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
}

export default exceptionFilter;
