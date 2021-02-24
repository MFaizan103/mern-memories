import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

// SignIn
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Dont Exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invaild Password or Email" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// SignIn //

// Sign Up
export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const secret = process.env.secretKey;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      secret,
      { expiresIn: "1h" }
    );
    res.status(201).json({ result: user, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Sign Up //
