import Attempt from "../models/AttemptModel.js";
import {Request, Response} from "express"
import asyncHandler from "express-async-handler";

export const createAttempt = asyncHandler(async (req: Request, res: Response) => {
    const {name, email} = req['user'];
    const attempt = new Attempt({...req.body, email:email, name: name});
    await attempt.save();
    res.json(attempt)
})

export const getQuizAttempts = asyncHandler(async (req: Request, res: Response) => {
    const attempts = await Attempt.find({quizId: req.params.id})
    res.json(attempts)
})

export const getUserAttempts = asyncHandler(async (req: Request, res: Response) => {
    const attempts = await Attempt.find({quizId: req.params.id, email: req["user"].email});
    res.json(attempts)   
})

export const delAttempt = asyncHandler(async (req: Request, res:Response) => {
    const attempt = await Attempt.deleteOne({_id:req.params.id});
    res.json(attempt)
})