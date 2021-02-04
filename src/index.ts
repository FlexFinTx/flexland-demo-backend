import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { Server } from "http";
import connectToDb from "./utils/connectToDb";
import validateEnv from "./utils/validateEnv";
import initialize from "./utils/initialize";
import routes from "./routes";

dotenv.config();

try {
  validateEnv();
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

let server: Server;

connectToDb()
  .then(async () => {
    console.log("Connected to database");
    await initialize();
    server = app.listen(PORT, () => {
      console.log(`FlexLand Backend listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });

// Webpack
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
