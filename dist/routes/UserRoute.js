import express from "express";
import * as c from "../controllers/UserController.js";
import protect from "../middlewares/protect.js";
const router = express.Router();
router.post("/", c.register);
router.post("/login", c.login);
router.use(protect);
router.put("/change-password", c.changePassword);
export default router;
//# sourceMappingURL=UserRoute.js.map