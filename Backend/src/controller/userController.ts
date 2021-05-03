import bcrypt from "bcrypt";
import User from "../model/userModel";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

export const signup: RequestHandler = async (req: any, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ email: user.email, id: user._id }, "test", {
      expiresIn: "1hr",
    });

    return res.status(200).json({ user, token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const signin: RequestHandler = async (req: any, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(403).json({ message: "User doesnot exist" });

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isCorrectPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      {
        expiresIn: "1hr",
      }
    );
    return res.status(201).json({ existingUser, token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
