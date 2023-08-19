import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.get("/api", (req, res) => (
  res.status(200).send(";)")
));

const port = process.env.PORT ?? 5000;
server.listen(port, () => (
  console.log(`Server listening on port ${port}`)
));