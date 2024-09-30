import * as bcrypt from 'bcrypt';

export class Password {
  private readonly hashedPassword: string;

  private constructor(hashedPassword: string) {
    this.hashedPassword = hashedPassword;
  }

  public static async create(plainPassword: string): Promise<Password> {
    const hashedPassword = await this.hashPassword(plainPassword);
    return new Password(hashedPassword);
  }

  public static async fromHashed(hashedPassword: string): Promise<Password> {
    return new Password(hashedPassword);
  }

  private static async hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
  }

  public async comparePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.hashedPassword);
  }

  public getHashedPassword(): string {
    return this.hashedPassword;
  }
}
