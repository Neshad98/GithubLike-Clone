import express from "express";
import { getUserProfileAndRepos } from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);
//todo => get likes 
//todo => post like a profile 

router.post("/like/:username", ensureAuthenticated, likeProfile)

export default router;