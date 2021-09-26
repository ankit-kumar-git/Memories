import express from "express";

import { signIn, signUp } from "../controllers/users.js";

const router = express.Router();

// Adding Routes

router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;
