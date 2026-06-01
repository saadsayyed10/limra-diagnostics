import express from "express";
import cors from "cors";
import { ENV } from "./config/env.config";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(cors());

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
};

startServer();
