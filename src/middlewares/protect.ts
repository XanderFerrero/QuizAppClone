import {Request, Response, NextFunction} from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            let decode = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET)
            req["user"] = await User.findById(decode["id"]).select("-password")
        }catch{
            res.status(400)
            throw new Error("Not a valid token")
        }
    }else{
        res.status(400)
        throw new Error("No Token")
    } 
    next()
})

export default protect