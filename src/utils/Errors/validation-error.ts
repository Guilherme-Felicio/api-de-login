export class ValidationError extends Error {
  statusCode = 422;
  detail: unknown;

  constructor(detail: unknown) {
    super("Invalid Values");
    this.detail = detail;
    this.name = "ValidationError";
  }
}
