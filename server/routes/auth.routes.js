
const Route = require("express"); 
const User = require("../models/User"); 
const jwt = require("jsonwebtoken"); 
const config = require("config"); 
 
const router = new Route(); 
 
const bcrypt = require("bcryptjs"); 
 
const { check, validationResult } = require("express-validator"); 
 
 
router.post( 
  "/registration", 
  [ 
    check("email", "Uncorrect email").isEmail(), 
    check( 
      "password", 
      "Password must be longer than 3 and shorter than 8" 
    ).isLength({ min: 3, max: 8 }), 
  ], 
  async (req, res) => { 
    try { 
      const errors = validationResult(req); 
      if (!errors.isEmpty()) { 
        return res.status(400).json({ message: "Uncorrect request", errors }); 
      } 
      const { email, password } = req.body; 
 
     
      const candidate = await User.findOne({ email }); 
 
      if (candidate) { 
        return res 
          .status(400) 
          .json({ message: `User with email ${email} already exist` }); 
      } 
 
      const hashPass = await bcrypt.hash(password, 10); 
      const user = new User({ email, password: hashPass }); 
 
      await user.save(); 
 
      return res.json({ message: "User was created" }); 
    } catch (e) { 
      console.log(e); 
      res.send({ message: "Server Error" }); 
    } 
  } 
); 
 
// Авторизация 
 
router.post("/login", async (req, res) => { 
  try { 
    const { email, password } = req.body; 
 
    const user = await User.findOne({ email }); 
 
 
    if (!user) { 
      return res.status(404).json({ message: "User not found" }); 
    } 

    const isPassValid = bcrypt.compareSync(password, user.password); 
    if (!isPassValid) { 
      return res.status(400).json({ message: "Invalid password" }); 
    } 
    
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), { 
      expiresIn: "2h", 
    }); 
 
    return res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        diskSpace: user.diskSpace, 
        usedSpace: user.usedSpace, 
        avatar: user.avatar, 
      }, 
    }); 
  } catch (e) { 
    res.send({ message: "Server error" }); 
  } 
}); 
 
module.exports = router;