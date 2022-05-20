import { createConnection } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async () =>
      await createConnection({
        type: "postgres",
        host: `${process.env.DB_HOST}`,
        port: 5432,
        username: "postgres",
        password: `${process.env.DB_PASSWORD}`,
        database: "polycode",
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
  },
];
