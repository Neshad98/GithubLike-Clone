import express from "express";

const router = express.Router();

router.get("/profile/:username", (req, res) => {
  res.send("User profile is ready");
})

export default router;