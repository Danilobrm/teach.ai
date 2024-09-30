import { AppError } from './AppError';

export class EmailErrors extends AppError {
  constructor(message: string, code: number) {
    super(message, code);
  }
}
