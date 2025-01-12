class HttpException extends Error {
  statusCode: number;
  constructor(statusCode: number, msg: string) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export default HttpException;
