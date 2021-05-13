
interface HashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(password: string, hashed: string): Promise<boolean>;
}

export {HashProvider}