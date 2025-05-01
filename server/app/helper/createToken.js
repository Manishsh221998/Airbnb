const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  try {
    const token = await jwt.sign(
      { id: user._id, name: user.username, email: user.email,phone :user.phone },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    // console.log(token)
    return token;
  } catch (error) {
    console.log("Error in token creation : ", error);
  }
};

module.exports = createToken;
