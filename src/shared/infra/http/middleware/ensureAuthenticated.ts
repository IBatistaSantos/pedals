import { AuthChecker } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import auth from '../../../../config/auth';
import { Request } from 'express';

interface IContext {
  req: Request;
  token?: string;
  userId?: string;
}
interface IPayload {
  iat: string;
  exp: string;
  sub: string;
}

const ensuredAuthenticated: AuthChecker<IContext> = ({ context }): boolean => {
  const authHeader = context.token;
  if (!authHeader) {
    return false;
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, auth.secret_token) as IPayload;
    if (decoded) {
      context.userId = decoded.sub;
    }
    return !!decoded;
  } catch {
    return false;
  }
};

export { ensuredAuthenticated, IContext };
