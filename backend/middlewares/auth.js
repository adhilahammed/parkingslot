import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  console.log(req.headers, "bol");

  const authHeader = req.headers.authorization;
  console.log(authHeader, "da");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  console.log(token, "tokendddd");

  try {
    console.log(process.env.JWT_SECRET, "police");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("sfdsf");

    console.log(decoded, "hai");

    req.user = decoded; // Attach the decoded user info to the request object
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
