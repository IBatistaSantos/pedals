import { hash, compare } from "bcryptjs";
import { HashProvider } from "../models/HashProvider";

class BcryptHashProvider implements HashProvider {
  async generateHash(password: string): Promise<string> {
    const hashPassword = await hash(password, 8);
    return hashPassword;
  }
 async compareHash(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }
}

export {BcryptHashProvider}