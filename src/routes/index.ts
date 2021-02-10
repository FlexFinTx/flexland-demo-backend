import { Router } from "express";

import did from "./did";
import bus from "./bus";
import city from "./city";
import degree from "./degree";
import employment from "./employment";
import insurance from "./insurance";
import health from "./health";

const router = Router();

router.use("/did", did);
router.use("/bus", bus);
router.use("/city", city);
router.use("/degree", degree);
router.use("/employment", employment);
router.use("/insurance", insurance);
router.use("/health", health);

export default router;
