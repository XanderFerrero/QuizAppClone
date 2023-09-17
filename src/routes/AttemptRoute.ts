import express from "express"
import * as c from "../controllers/AttemptController.js"
import protect from "../middlewares/protect.js"

const router: express.Router = express.Router();

router.use(protect);
router.post("/", c.createAttempt);
router.get("/:id", c.getQuizAttempts);
router.get("/my/:id", c.getUserAttempts)
router.delete("/:id", c.delAttempt)

export default router; 