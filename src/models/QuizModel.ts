import mongoose from "mongoose"

interface IItem {
    itemId: string,
    question: string,
    options: string[],
    pts: number,
    answer:string
}

interface IQuiz {
    title: string,
    user: string,
    total: number,
    items: IItem[],
    userName: string
}

const quizSchema = new mongoose.Schema<IQuiz, mongoose.Model<IQuiz>>({
    title:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    userName:{
        type:String,
    },
    total:{
        type: Number,
    },
    items:{
        type:[{
            itemId:String,
            question:String,
            options:[String],
            pts:Number,
            answer:String,
            _id:false
        }],
        required:true
    }
},{
    timestamps:true
})

quizSchema.pre("save", async function(next){
    console.log(this.total)
    this.items.map(item => {
        this.total += item.pts
    });

    next()
})

export default mongoose.model<IQuiz>("quizzes", quizSchema);