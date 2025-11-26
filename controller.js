import express from "express";
import { getUser } from "./routes.js";

const router = express.Router();

router.get("/user", getUser);

export default router;
