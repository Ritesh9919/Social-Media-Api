const User = require("../models/user.model");


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already axist");
    }
    const user = new User({name, email, password});
    user.save();
    res.status(201).json({ success: true, msg: "User registred successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
    register
}
