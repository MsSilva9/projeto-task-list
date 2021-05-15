interface IStoreUser {
  name: string;
  email: string;
  password: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  created_at: string;
  updated_at: string;
}