import express from "express";
import {
  getCompanyApplications,
  confirmApplications,
} from "../controllers/CompanyController.js";

const router = express.Router();

router.get("/applications", getCompanyApplications);
router.post("/confirm-applications", confirmApplications);

export default router;
