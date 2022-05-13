import { Connection } from "typeorm";
import { UserEntity } from "./users.entity";

export const UsersProviders = [
  {
    provide: "UsersRepository",
    useFactory: (connection: Connection) => connection.getRepository(UserEntity),
    inject: ["DATABASE_CONNECTION"],
  },
];
