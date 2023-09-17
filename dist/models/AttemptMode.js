import mongoose from "mongoose";
const attemptSchema = new mongoose.Schema({
    data: {
        type: [{
                answer: String,
                pts: Number
            }],
        required: true
    },
    quizId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});
export default mongoose.model("attempts", attemptSchema);
//# sourceMappingURL=AttemptMode.js.map