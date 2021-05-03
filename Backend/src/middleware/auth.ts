import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const auth: RequestHandler = async (req: any, res, next) => {
  try {
    const header: any = req.headers;
    const token = header.authorization.split(" ")[1];

    if (!token)
      return res.status(400).json({ message: "Invalid authentication" });

    const decoded = jwt.verify(token, "test");
    return (req.decoded = decoded);
    next();
  } catch (e) {
    return res.status(404).json({ msg: "Invalid auth" });
  }
};
