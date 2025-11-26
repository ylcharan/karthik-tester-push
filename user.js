import express from "express";
import router from "./controller.js";

const ex = express();

ex.use("/", router);

ex.listen(3500);
