import jwt from "jsonwebtoken";

const genrateToken = (res, user) => {
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" });


  return token;
};

export default genrateToken;
