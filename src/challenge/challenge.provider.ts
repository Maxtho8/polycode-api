import { Connection } from "typeorm";
import { ChallengeEntity } from "./challenge.entity";

export const ChallengeProviders = [
  {
    provide: "ChallengeRepository",
    useFactory: (connection: Connection) => connection.getRepository(ChallengeEntity),
    inject: ["DATABASE_CONNECTION"],
  },
];
