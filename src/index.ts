import express, {Request, Response} from "express";
import UserRouter from "./routes/UserRoute.js"
import QuizRouter from "./routes/QuizRoute.js"
import AttemptRouter from "./routes/AttemptRoute.js"
import error from "./middlewares/error.js"
import mongoose from "mongoose"
import cors from "cors"
import { fileURLToPath } from "url";
import path from "path"

//parse dir name
const getDirName = function(url: string): string {
    const filename = fileURLToPath(url);
    return path.dirname(filename);
}

const _dirname: string = getDirName(import.meta.url);

mongoose.connect("mongodb+srv://xanderferrero2:getAPlus@quizclone.x1v70vv.mongodb.net/")

const app: express.Application = express();

//middlewares
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:3001","http://localhost:4173"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//api
app.use("/api/user", UserRouter)
app.use("/api/quiz", QuizRouter)
app.use("/api/attempt", AttemptRouter)
app.use(error)

// Serve frontend

app.use(express.static(path.join(_dirname, "../dist2")))
app.get("*", (_req: Request, res: Response) => {res.sendFile(path.resolve(_dirname, "..","dist2","index.html"))})

app.listen(3001, () => {
    console.log("HELLO WORLD")
})