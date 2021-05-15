import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import usersRepository from "../repositories/users.repository";

class UsersController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const parsedId = Number(id);

      const user = await usersRepository.findById(parsedId);

      if (!user)
        return response.status(401).json({ message: "User not found" });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {

      const userAlreadyExists = await usersRepository.findByEmail(email);

      if (userAlreadyExists)
        return response.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const ids = await usersRepository.store({
        name,
        email,
        password: hashedPassword
      });

      const id = ids[0];

      const user: IUser = await usersRepository.findById(id);

      delete user.password;

      return response.status(201).json(user);

    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new UsersController();