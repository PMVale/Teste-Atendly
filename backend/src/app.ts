import express from "express";
import router from "./routes";
import cors from 'cors';

const app = express();

app.get("/", (_req, res) => {
  res.send();
});

app.use(express.json());

app.use(cors({origin: 'http://localhost:8080'}));

app.use(router);

export default app;