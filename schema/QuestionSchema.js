const mongoose = require("mongoose")
const QuestionSchema = mongoose.Schema({
    questionName: {
        type: String,
        required: true,
    },
    questionTag: {
        type: Array,
        required: true,
    },
    questionDescription: {
        type: String,
        required: true,
    },
    questionAnswer: {
        type: String,
        required: true,
    },
    questionDate: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    submitDate: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Question", QuestionSchema)