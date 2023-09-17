import {Router} from "express"
import protect from "../middlewares/protect.js"
import * as c from "../controllers/QuizController.js"

const router: Router = Router()

router.use(protect)
router.post("/", c.createQuiz)
router.put("/:id", c.updateQuiz)
router.delete("/:id", c.delQuiz)
router.get("/all/:id", c.getQuiz)
router.get("/all/", c.getQuizzes)
router.get("/my", c.getMy)

export default router