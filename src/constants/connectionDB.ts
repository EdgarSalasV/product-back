import "reflect-metadata";
import { createConnection } from "typeorm";
import { dbOptions } from "./dbOptions";

export const connectionDB = async () => {
  try {
    const connection = await createConnection(dbOptions);
    return connection;
  } catch (error) {
    const { code, errno, sqlMessage, sqlState } = error;
    if (sqlMessage) {
      console.error(`Error in DB:
      code:${code}
      errno:${errno}
      sqlMessage:${sqlMessage}
      sqlState:${sqlState}`);
    } else {
      console.error(error);
    }
  }
};
