import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getCompanyApplications } from "../controllers/CompanyController.js";

const router = express.Router();

router.get("/applications", getCompanyApplications);

export default router;
