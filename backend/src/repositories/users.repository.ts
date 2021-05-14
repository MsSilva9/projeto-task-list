import connection from "../database/connection";

interface IStoreUser {
  name: string;
  email: string;
  password: string;
}

class UsersRepository {
  async store(userData: IStoreUser) {
    try {
      const id = await connection("users").insert(userData);

      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: number) {
    try {
      const user = await connection("users").where({ id }).first();

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await connection("users").where({ email }).first();

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UsersRepository();