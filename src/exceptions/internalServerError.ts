import HttpException from "./httpException";

export class InternalServerError extends HttpException {
  constructor() {
    super(500, "Internal server error");
  }
}
