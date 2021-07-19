const router = require("express").Router()
const UserRecord = require("../schema/UserRecord")

router.get("/", async (req, res) => {
    try {
        const temp = await UserRecord.find({}, ['userQuestionNumber', 'userCurrentRecord', 'userHistoryRecord', 'userName']).sort({ userQuestionNumber: "descending" }).then(result => {
            res.json(result)
        })
    } catch (err) {
        res.json({message: err})
    }
})
  
module.exports = router
