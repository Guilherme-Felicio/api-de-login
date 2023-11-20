export class InternalServerError extends Error {
  statusCode = 500;
  detail: unknown;

  constructor(detail: unknown) {
    super("Internal server Error");
    this.detail = detail;
    this.name = "Internal Server Error";
  }
}
