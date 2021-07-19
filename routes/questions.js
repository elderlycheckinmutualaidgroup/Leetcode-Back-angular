const express = require("express")
const router = express.Router()
const Question = require("../schema/QuestionSchema")
const mongoose = require("mongoose")
const UserRecord = require("../schema/UserRecord")

router.get("/", async (req, res) => {
    try {
        const questions = await Question.find({}, ['questionId', 'questionName', 'userName', 'questionTag', 'questionDate']).sort({ submitDate: "descending" })
        res.json(questions)
      } catch (err) {
        res.json({ message: err })
      }
})

router.post('/one', async (req, res) => {
    try {
        const { questionId } = req.body;
        const question = await Question.findOne({ '_id': questionId })
        res.json(question)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/getByUserName', async (req, res) => {
    try {
        const { userName } = req.body;
        const question = await Question.find({ 'userName': userName }, ['questionId', 'questionName', 'userName', 'questionTag', 'questionDate']).sort({ submitDate: "descending" })
        res.json(question)
    } catch (err) {
        res.json({ message: err })
    }
})


router.post('/update', async (req, res) => {
    try {
        const { questionId, questionName, questionTag, questionDescription, questionAnswer, questionDate, userName } = req.body;
        const question = await Question.updateOne({ '_id': questionId }, {
            $set: {
                questionName: questionName,
                questionTag: questionTag,
                questionDescription: questionDescription,
                questionDescription: questionDescription,
                questionAnswer: questionAnswer,
                questionDate: questionDate,
            },
        })
        res.json(question)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/delete', async (req, res) => {
    try {
        const { questionId } = req.body;
        const question = await Question.deleteOne({ _id: questionId })
        res.json(question)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/upload', async(req, res) => {
    const { questionName, questionTag, questionDescription, questionAnswer, questionDate, userName } = req.body
    const question = new Question({
        questionName: questionName,
        questionTag: questionTag,
        questionDescription: questionDescription,
        questionAnswer: questionAnswer,
        questionDate: questionDate,
        userName: userName,
    })
    
    try {
        const savedQuestion = await question.save().then(async function () {
            
            const temp = await UserRecord.findOne({ 'userName': userName });
            if (temp) {
                var dateDifferent = (new Date() - temp.lastSubmitDate) / 3600000
                if (dateDifferent >= 24.0 && dateDifferent <= 48.0) {
                    temp.userQuestionNumber++;
                    temp.userCurrentRecord++;
                    temp.userHistoryRecord = Math.max(temp.userCurrentRecord, temp.userHistoryRecord);
                } else if (dateDifferent > 48.0) {
                    temp.userQuestionNumber++;
                    temp.userCurrentRecord = 1;
                } else if (dateDifferent <= 24.0) {
                    temp.userQuestionNumber++;
                }
                await temp.save();
            } else {
                const userRecord = new UserRecord({
                    userName: userName,
                })
                userRecord.save();
            }
            res.json({ message: "success" })
            });
    } catch (err) {
        res.json({message: err})
    }
})
module.exports = router