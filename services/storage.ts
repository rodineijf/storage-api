import {
  GridFSBucket,
  GridFSBucketReadStream,
  MongoClient,
  ObjectID,
} from "mongodb";
// @ts-ignore
import streamifier from "streamifier";

import Errors from "../enums/errors";

interface IFile {
  buffer: Buffer;
  originalname: string;
}

function upload(file: IFile) {
  return new Promise(async (resolve, reject) => {
    try {
      const client = new MongoClient(process.env.MONGO_URI!);
      await client.connect();
      const db = client.db(process.env.DB_NAME);
      const bucket = new GridFSBucket(db);

      streamifier
        .createReadStream(file.buffer)
        .pipe(bucket.openUploadStream(file.originalname))
        .on("error", (error: any) => {
          client.close();
          reject(error);
        })
        .on("finish", (res: any) => {
          client.close();
          resolve({ ...res });
        });
    } catch (error) {
      reject(error);
    }
  });
}

function download(
  id: string,
): Promise<{ stream: GridFSBucketReadStream; data: { filename: string } }> {
  return new Promise(async (resolve, reject) => {
    try {
      const client = new MongoClient(process.env.MONGO_URI!);
      await client.connect();
      const db = client.db(process.env.DB_NAME);
      const bucket = new GridFSBucket(db);

      const data = await db
        .collection("fs.files")
        .findOne({ _id: new ObjectID(id) });

      if (!data) {
        reject({ code: Errors.FileNotFound });
      }

      const stream = bucket.openDownloadStream(new ObjectID(id));

      resolve({
        data,
        stream,
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default {
  download,
  upload,
};
