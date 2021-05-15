import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IToken {
  userId: number;
}

export default function authenticationMiddleware(request: Request, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization)
    return response.status(401).json({ message: "Token is required" });

  const token = authorization.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN || "") as IToken;

    const { userId } = data;

    request.userId = userId;

    return next();
  } catch (error) {
    return response.status(500).json({ message: "Erro interno ao verificar token" });
  }
}