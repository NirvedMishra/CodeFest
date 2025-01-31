import { jwtDecode } from "jwt-decode";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";

const verifyUser = asynchandler(async (req, res, next) => {
    const accessToken = req.cookies.accessToken ||req.headers.authorization?.split(" ")[1] ||req.body.accessToken;
    if(!accessToken){
        throw new ApiError(400,"Unauthorized Access")
    }
    const verify = jwtDecode(accessToken)
    if(!verify._id){
        throw new ApiError(400,"Unauthorized Access")
    }
    const user = await User.findById(verify._id).select("-password")
    if(!user){
        throw new ApiError(404,"User not found")
    }
    req.user = user
    next()
});

export {verifyUser} 