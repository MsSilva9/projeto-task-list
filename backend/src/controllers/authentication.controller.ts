import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import usersRepository from "../repositories/users.repository";

class AuthenticationController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const user: IUser = await usersRepository.findByEmail(email);

    if (!user)
      return response.status(401).json({ message: "User not found" });

    const matchPassword = await bcrypt.compare(password, user.password || "");

    if (!matchPassword)
      return response.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_TOKEN || "");

    delete user.password;

    return response.json({ user, token });
  }
}

export default new AuthenticationController();