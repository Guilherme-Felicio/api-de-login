export default interface IBaseError extends Error {
  statusCode: number;
  detail: unknown;
  message: string;
}
