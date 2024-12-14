import { PrismaClient } from "@prisma/client";
import express from "express";
import { authenticateToken } from "../middlewares/auth.js";

const prisma = new PrismaClient();
export const sloteRouter = express.Router();

sloteRouter.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    const createdUser = await prisma.user.create({
      data: {
        email,
      },
    });
    console.log(createdUser);
    res.json(createdUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

sloteRouter.post("/book", async (req, res) => {
  try {
    const { slotNumber, status, userId } = req.body;

    const getSlote = await prisma.slot.findFirst({
      where: {
        slotNumber: slotNumber ? slotNumber : undefined,
      },
    });

    const getSloteByUser = await prisma.bookings.findMany({
      where: {
        userId: userId,
        slot: {
          status: "BOOKED",
        },
      },
    });

    console.log(getSlote, "getSlote");
    console.log(getSloteByUser, "getSloteByUser");

    if (getSlote?.status === "BOOKED" || getSloteByUser?.length !== 0)
      return res.status(400).json({
        message: "booking unavailable",
      });

    const createBooking = await prisma.bookings.create({
      data: {
        slot: {
          connect: {
            slotNumber,
          },
          // Connect to the existing Slot by slotNumber
        },
        user: {
          connect: { id: userId }, // Connect to the existing User by userId
        },
      },
    });

    await prisma.slot.update({
      where: { slotNumber },
      data: { status: status },
    });

    console.log(createBooking);

    res.json(createBooking);
  } catch (error) {
    console.log(error);

    res.json(error);
  }
});

sloteRouter.post("/cancel", async (req, res) => {
  try {
    const { slotNumber, id } = req.body;
    const updateSlot = await prisma.slot.update({
      where: {
        slotNumber,
      },
      data: {
        status: "AVAILABLE",
      },
    });

    const cancelledBooking = await prisma.bookings.delete({
      where: {
        id,
      },
    });

    const response = {
      ...updateSlot,
      ...cancelledBooking,
    };

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// sloteRouter.put('/cancel',async(req,res)=>{
//   try {
//     const
//   } catch (error) {

//   }
// })

sloteRouter.get("/getSlotes", async (req, res) => {
  try {
    const getSlotes = await prisma.slot.findMany({
      select: {
        id: true,
        slotNumber: true,
        status: true,
        bookings: true,
      },
    });
    console.log(getSlotes);
    res.json(getSlotes);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

sloteRouter.get("/getBookedSlot/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const selectedSlote = await prisma.bookings.findFirst({
      where: {
        slotNumber: parseInt(id),
        userId,
        slot: {
          status: "BOOKED",
        },
      },
    });
    console.log(selectedSlote);
    res.json(selectedSlote);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
