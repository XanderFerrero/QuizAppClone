import mongoose from "mongoose";

interface IItem{
    answer: string;
    pts: number
}

interface IAttempt{
    data: IItem[];
    quizId: string;
    email: string;
    name: string;
    total: number;
}

const attemptSchema = new mongoose.Schema<IAttempt, mongoose.Model<IAttempt>>({
    data:{
        type:[{
            answer: String,
            pts: Number,
            _id:false
        }],
        required: true
    },
    quizId: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    total:{
        type: Number,
        default:0
    }
},{
    timestamps:true
})

attemptSchema.pre("save", function (next) {
    this.data.map(i => {
        this.total += i.pts
    })
    next()
})

export default mongoose.model<IAttempt>("attempts", attemptSchema)