import { PrismaClient } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authRouter = express.Router();
const prisma = new PrismaClient();

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
console.log(saltRounds, "hai");
authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const signupResponse = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    res.json(signupResponse);
  } catch (error) {
    // if (error.code === "P2002") {
    //   res.status(400).json({ message: "mail is already used" });
    // }

    res.json(error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    console.log(email, "hai");
    const loginResponse = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!loginResponse)
      return res.status(400).json({ message: "invalid credentials" });

    const isPasswordValid = await bcrypt.compare(
      password,
      loginResponse.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log(loginResponse, "login");

    const token = jwt.sign(
      { email: loginResponse.email, userId: loginResponse.id }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRES_IN } // Token expiry
    );

    console.log(token, "rrrrrrrrr");

    const response = {
      token,
      userId: loginResponse?.id,
    };

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

export default authRouter;
