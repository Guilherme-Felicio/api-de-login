export class ConflictError extends Error {
  statusCode = 409;
  detail: unknown;

  constructor(detail: string) {
    super("Conflict Error");
    this.detail = detail;
  }
}
