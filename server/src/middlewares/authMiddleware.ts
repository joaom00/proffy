import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .send({ message: 'Sua sessão está inválida ou expirada' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, 'secret');

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res
      .status(401)
      .send({ message: 'Sua sessão está inválida ou expirada' });
  }
}
