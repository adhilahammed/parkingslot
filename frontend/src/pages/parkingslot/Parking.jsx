import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Confirmation from "../../components/confirmation/confirmation";
import { useUserSessionStore } from "../../store/userSession";
import Time from "../../components/timer/Timer";

const Parking = () => {
  const [slots, setSlots] = useState(
    Array(28).fill(false) // Initialize 10 slots, all available (false)
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotNumber, setSlotNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", carNumber: "" });

  const userSession = useUserSessionStore((state) => state.session);

  const { data, refetch } = useQuery({
    queryKey: ["slot"],
    queryFn: async () => {
      const response = await axios.get(
        `https://${import.meta.env.VITE_API}/slot/getSlotes`
      );
      return response.data;
    },
  });

  const getSlotes = React.useMemo(() => {
    return data?.sort((a, b) => a?.slotNumber - b?.slotNumber);
  }, [data]);

  console.log(data, "slot");
  console.log(selectedSlot, "selectedSlot");

  const handleSlotClick = (index) => {
    if (!slots[index]) {
      setSelectedSlot(index);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = () => {
    if (selectedSlot !== null) {
      const updatedSlots = [...slots];
      updatedSlots[selectedSlot] = true;
      setSlots(updatedSlots);
      setSelectedSlot(null);
      setUserInfo({ name: "", carNumber: "" });
      setShowModal(false);
    }
  };

  return (
    <div
      className="p-6 bg-gray-100 min-h-screen relative sm:grid"
      style={{
        gridTemplateColumns: "1fr 4fr",
      }}
    >
      <div className="flex flex-col justify-center align-middle">
        <div
          style={{
            width: "200px",
          }}
          className="flex gap-2"
        >
          <div
            style={{
              border: "1px solid red",
              height: "20px",
              width: "40px",
              backgroundColor: "red",
            }}
          ></div>
          <div>Booked</div>
        </div>
        <div
          style={{
            width: "200px",
          }}
          className="flex gap-2"
        >
          <div
            style={{
              border: "1px solid #22c55e",
              height: "20px",
              width: "40px",
              backgroundColor: "#22c55e",
            }}
          ></div>
          <div>Your Booking</div>
        </div>
        <div
          style={{
            width: "200px",
          }}
          className="flex gap-2"
        >
          <div
            style={{
              border: "1px solid grey",
              height: "20px",
              width: "40px",
              backgroundColor: "#FFFFFF",
            }}
          ></div>
          <div>Available</div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">
          Parking Slot Booking
        </h1>

        {/* Slot Grid */}
        <div
          style={{
            border: "1px solid grey",
            borderRadius: "10px",
            padding: "50px 0px 0px",
            margin: "20px 0px",
          }}
        >
          <div className="grid grid-cols-4 gap-4 mb-6">
            {getSlotes?.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  handleSlotClick(index);
                  setSlotNumber(item?.slotNumber);
                }}
                className={`p-4 border rounded-lg cursor-pointer text-center ${
                  item?.status === "BOOKED" &&
                  item?.bookings[0]?.userId !== userSession?.userId
                    ? "bg-red-500 text-white"
                    : item?.status === "BOOKED" &&
                      item?.bookings[0]?.userId === userSession?.userId
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : selectedSlot === index
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black-500"
                }`}
              >
                Slot {item?.slotNumber}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        {selectedSlot !== null && (
          <Confirmation
            slotNumber={slotNumber}
            setSelectedSlot={setSelectedSlot}
            refetch={refetch}
          />
        )}
      </div>

      {/* Booking Confirmation Modal */}
    </div>
  );
};

export default Parking;
