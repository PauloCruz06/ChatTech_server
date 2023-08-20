import express from "express";
import cors from "cors";
import "express-async-errors";

import router from "./routers/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app
  .use(express.json())
  .use(cors())
  .use(router)
  .use(errorHandler);

export default app;