import express from "express";
import {
  createJob,
  deleteJob,
  getAllJob,
  showStats,
  updateJob,
} from "../controllers/jobController.js";


const router = express.Router();

router.get("/", getAllJob);
router.post("/", createJob);
router.get("/stats", showStats);
router.delete("/:id", deleteJob);
router.patch("/:id", updateJob);

export default router;
