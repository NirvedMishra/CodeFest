import { Router } from "express";
import { createWorkSpace,addInvitation, sendInvitation, getWorkSpace } from "../controllers/workspace.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createWorkspace").post(verifyUser,createWorkSpace);
router.route("/addInvitation").patch(verifyUser,addInvitation);
router.route("/sendInvitation").patch(verifyUser,sendInvitation);
router.route("/getWorkspace/:id").get(verifyUser,getWorkSpace);

export default router;