import { Request, Response } from "express";

import tasksRepository from "../repositories/tasks.repository";
import usersRepository from "../repositories/users.repository";

class TasksController {
  async index(request: Request, response: Response) {
    try {
      const tasks = await tasksRepository.findByUserId(request.userId);

      return response.json(tasks);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const parsedId = Number(id);

      const task = await tasksRepository.findById(parsedId, request.userId);

      return response.json(task);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async store(request: Request, response: Response) {
    const {
      userId,
      title,
      description,
      deliveryDate,
      completedDate
    } = request.body;

    try {
      const usersExists = await usersRepository.findById(userId);

      if (!usersExists)
        return response.status(400).json({ message: "User not found" });

      const ids = await tasksRepository.store({
        user_id: userId,
        title,
        description,
        delivery_date: deliveryDate,
        completed_date: completedDate
      });

      const id = ids[0];

      const task = await tasksRepository.findById(id, request.userId);

      return response.json(task);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new TasksController();