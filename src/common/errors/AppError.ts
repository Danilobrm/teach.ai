export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    // Mantém o stack trace correto se disponível
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
