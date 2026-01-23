import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated. Please login.",
        success: false,
      });
    }

    //  Verify the token using your Secret Key
    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid token.", 
        success: false,
      });
    }

    req.id = decode.userId;

    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).json({
      message: "Authentication failed.",
      success: false,
    });
  }
};

export default isAuthenticated;
