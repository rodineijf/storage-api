import express, { NextFunction, Request, Response } from "express";
import { ObjectID } from "mongodb";
import multer from "multer";

import logger from "../config/winston";
import Errors from "../enums/errors";
import storageService from "../services/storage";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/:id", async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).send({ error: Errors.InvalidIdentifier });
    return;
  }
  try {
    const { stream, data } = await storageService.download(req.params.id);
    res.set("Content-Disposition", `attachment; filename=${data.filename}`);
    res.set("Content-Type", "application/octet-stream");
    stream.pipe(res);
  } catch (error) {
    if (error.code === Errors.FileNotFound) {
      res.status(404).send({ error: Errors.FileNotFound });
    } else {
      logger.error("error at /GET storage", error);
      res.sendStatus(500);
    }
  }
});

function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
  upload.single("file")(req, res, err => {
    if (err) {
      res.send({ error: err.message });
    } else {
      next();
    }
  });
}

router.post("/", uploadMiddleware, async (req, res) => {
  try {
    const result = await storageService.upload(req.file);
    res.send(result);
  } catch (error) {
    logger.error("error at /POST storage", error);
    res.sendStatus(500);
  }
});

export default router;
