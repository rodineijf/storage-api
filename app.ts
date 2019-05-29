import dotenv from "dotenv";

dotenv.config();

import express from "express";

import logger from "./config/winston";
import storageRouter from "./routes/storage";

const app = express();

app.get("/", (req, res) => {
  res.send({
    node: process.version,
    status: "running",
  });
});

app.use("/storage", storageRouter);

const port = +process.env.PORT! || 3000;

app.listen(port, () => {
  logger.info(`App listening on port ${port}!`);
});
