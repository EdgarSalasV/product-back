import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as path from "path";
import { Routes } from "./routes/Routes";
import { connectionDB } from "./constants/connectionDB";
const PORT = Number(process.env.PORT) || 8080;
const URL_GENERAL = process.env.URL_GENERAL || "http:127.0.0.1:";

// create and setup express app
async function main() {
  const app = express();
  app.use(cors());

  const connection = await connectionDB();
  if (!connection) {
    return;
  }
  console.log('path', path.join(__dirname, "../frontend/"))
  app.use(
    express.static(path.join(__dirname, "../frontend"))
  );
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(bodyParser.json({ limit: "50mb" }));

  //Routes
  Routes(app);

  // start express server
  app.listen(PORT, () =>
    console.log(`server running on ${URL_GENERAL + PORT}`)
  );
}

main();
