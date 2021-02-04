import express, { Router } from "express";

import did from "./did";
import bus from "./bus";
import city from "./city";
import degree from "./degree";
import employment from "./employment";
import insurance from "./insurance";

const router = Router();

router.use("/did", did);
router.use("/bus", bus);
router.use("/city", city);
router.use("/degree", degree);
router.use("/employment", employment);
router.use("/insurance", insurance);

export default router;
