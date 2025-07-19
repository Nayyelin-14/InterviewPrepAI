import { Worker } from "bullmq";
import sharp from "sharp";

import redis from "../../configs/redisConnect.js";
import { uploadToCloudinary } from "../../utils/cloudUpload.js";
const ImageWoker = new Worker(
  "imageQueue",
  async (job) => {
    const { fileName, width, height, quality, buffer } = job.data;
    const decodedBuffer = Buffer.from(buffer, "base64");
    const optimizedProfileImg = await sharp(decodedBuffer)
      .resize(width, height)
      .webp({ quality })
      .toBuffer();
    console.log(optimizedProfileImg);
    const result = await uploadToCloudinary(
      optimizedProfileImg,
      "profile_images",
      fileName
    );
    console.log("result2", result);
    return result;
  },
  {
    connection: redis,
  }
);

ImageWoker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

ImageWoker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});
