import HttpException from "./httpException";

class InternalServerError extends HttpException {
  constructor() {
    super(500, "Internal server error");
  }
}