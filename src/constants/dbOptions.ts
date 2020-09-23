import { ConnectionOptions } from "typeorm";

export const dbOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "productos",
  entities: ["lib/entities/**/*.ts"],
  logging: true,
  synchronize: false,
} as ConnectionOptions;
