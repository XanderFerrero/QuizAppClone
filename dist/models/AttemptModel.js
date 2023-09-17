import mongoose from "mongoose";
const attemptSchema = new mongoose.Schema({
    data: {
        type: [{
                answer: String,
                pts: Number,
                _id: false
            }],
        required: true
    },
    quizId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
attemptSchema.pre("save", function (next) {
    this.data.map(i => {
        this.total += i.pts;
    });
    next();
});
export default mongoose.model("attempts", attemptSchema);
//# sourceMappingURL=AttemptModel.js.map