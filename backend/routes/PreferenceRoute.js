import express from "express";
import {
  getPreferences,
  savePreferences,
} from "../controllers/PreferenceController.js";

const router = express.Router();

router.post("/save-preferences", savePreferences);
router.get("/", getPreferences);

export default router;
