import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(403).json({ success: false, message: "Invalid token. Please log in again." });
    }

    // ✅ Instead of setting req.body.userId, do this:
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default userAuth;
