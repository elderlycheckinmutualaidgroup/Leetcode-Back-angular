const mongoose = require("mongoose")

const UserRecordSchema = mongoose.Schema({
  userQuestionNumber: {
    type: Number,
    default: 1,
    required: true,
  },
    userCurrentRecord: {
        type: Number,
        default: 1,
        required: true,
    },
    userHistoryRecord: {
        type: Number,
        default: 1,
        required: true,
    },
    userName: {
        type: String,
        reqired: true,
    },
    lastSubmitDate: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("UserRecord", UserRecordSchema)