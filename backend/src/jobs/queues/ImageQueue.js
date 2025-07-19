import { Queue } from "bullmq";

import redis from "../../configs/redisConnect.js";

const ImageQueue = new Queue("imageQueue", { connection: redis });

export default ImageQueue;
