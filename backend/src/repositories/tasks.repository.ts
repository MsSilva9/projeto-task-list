import connection from "../database/connection";

class TasksRepository {
  async store(taskData: IStoreTask) {
    try {
      const id = await connection("tasks").insert(taskData);

      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: number, userId: number) {
    try {
      const task = await connection("tasks").where({ id, user_id: userId }).first();

      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByUserId(userId: number) {
    try {
      const tasks = await connection("tasks").where({ user_id: userId });

      return tasks;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new TasksRepository();