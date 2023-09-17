import Quiz from "../models/QuizModel.js"
import asyncHandler from "express-async-handler"
import {Request, Response} from "express"

export const createQuiz = asyncHandler(async (req: Request, res: Response) => {
    const quiz = new Quiz({
        ...req.body,
        user:req['user'].id,
        userName: req['user'].name
    })
    await quiz.save()
    res.json(quiz)
})

export const updateQuiz = asyncHandler(async (req: Request, res: Response) => {

    console.log("updated")
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, {
        ...req.body,
        user:req['user'].id
    });

    await quiz.save();
    res.json(quiz)
})

export const delQuiz = asyncHandler(async (req: Request, res: Response) => {

    console.log(req['user'].id)
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    res.json(quiz)
})

export const getQuizzes = asyncHandler(async (_req: Request, res: Response) => {
    const all = await Quiz
                        .find({})
                        .collation({"locale":'en'})
                        .sort({title: 1})
    res.json(all)
})

export const getMy = asyncHandler(async (req: Request, res: Response) => {
    console.log(req["user"].name)
    const quizzes = await Quiz
                            .find({user:req['user'].id})
                            //collation: sorting with no case sensitivity
                            .collation({"locale":'en'})
                            .sort({title: 1})
    res.json(quizzes)
})

export const getQuiz = asyncHandler(async (req: Request, res: Response) => {

    try{
        const quiz = await Quiz.findOne({_id:req.params.id}, ).lean().orFail();
        res.json({...quiz, email:req["user"].email});
        
    }catch(e){
        res.status(400);
        throw new Error("ID doesn't match with any quiz")
    }

})

