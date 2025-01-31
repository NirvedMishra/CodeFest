import {Router} from "express";
import { login, logOut, refreshAccessToken, register, verifyOtpRegistration } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(verifyUser,logOut);
router.route('/refresh').post(refreshAccessToken);
router.route('/verifyRegistration').post(verifyOtpRegistration);



export default router;