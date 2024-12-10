import express from "express";
import usersRouter from "./users.route";

const router = express.Router();

router.use('/api', usersRouter);

export default router;