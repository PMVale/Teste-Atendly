import express from "express";
import router from "./routes";

const app = express();

app.get("/", (_req, res) => {
  res.send();
});

app.use(express.json());

app.use(router);

export default app;