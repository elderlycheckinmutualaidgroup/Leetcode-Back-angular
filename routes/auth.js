const router = require("express").Router()
const User = require("../schema/UserSchema")

router.post("/signup", async (req, res) => {
    const { userName, password } = req.body
    const user = new User({
      userName: userName,
      password: password,
    })
    const savedUser = await user.save();
    res.send(savedUser);
    console.log(user)
    try {
        const savedUser = await user.save().then(result => {
            res.json({ message: "success" })
        })
        console.log(savedUser)
    } catch (err) {
        res.json({message: err})
    }
    
})

router.post("/login", async (req, res) => {
  const { userName, password } = req.body
  try {
    const user = await User.findOne({ userName: userName });
    console.log(user)
    if (user) {
      res.send({message: "yes"})
    } else {
      res.send({message: "no"})
    }   
  } catch (err) { 
    res.json({message: err})
  }
  
})
  
module.exports = router
