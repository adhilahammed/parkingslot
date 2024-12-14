import { PrismaClient } from "@prisma/client";
import express from "express";

const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.get("/list", async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

export default userRouter;
