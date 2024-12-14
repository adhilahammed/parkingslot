import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useUserSessionStore } from "../../store/userSession";
import Time from "../timer/Timer";

const Confirmation = ({ slotNumber, setSelectedSlot, refetch }) => {
  console.log(slotNumber, "slotNumber");
  const navigate = useNavigate();
  const userSession = useUserSessionStore((state) => state.session);

  const { data } = useQuery({
    queryKey: [slotNumber],
    queryFn: async () => {
      const response = await axios.get(
        `https://${import.meta.env.VITE_API}/slot/getBookedSlot/${slotNumber}`,
        {
          headers: {
            Authorization: `Bearer ${userSession.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const { data: slote } = useQuery({
    queryKey: [slotNumber, "dd"],
    queryFn: async () => {
      const response = await axios.get(
        `https://${import.meta.env.VITE_API}/slot/getSlotes`,
        {
          headers: {
            Authorization: `Bearer ${userSession.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  console.log(slote, "slote");

  const unbooked = React.useMemo(() => {
    return slote
      ?.filter((slot) => slot?.status === "AVAILABLE")
      ?.map((slot) => slot?.slotNumber); // Filter only AVAILABLE slots
  }, [slote]);

  const isIncluded = React.useMemo(() => {
    return unbooked?.includes(slotNumber);
  }, [unbooked]);

  console.log(isIncluded, "isIncluded");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (data) {
      console.log("dravid");
      reset({
        VehicleNumber: data?.slotNumber,
      });
    } else {
      console.log("sachin");
      reset({});
    }
  }, [data]);

  const Book = async (book) => {
    const response = await axios.post(
      `https://${import.meta.env.VITE_API}/slot/book`,
      book
    );
    return response.data;
  };

  const Exit = async (exit) => {
    const response = await axios.post(
      `https://${import.meta.env.VITE_API}/slot/cancel`,
      exit
    );
    return response.data;
  };

  const exitmutation = useMutation(Exit, {
    onSuccess: (data) => {
      console.log("haiddd");

      toast.success("exited successfully");
      refetch();
      setSelectedSlot(null);
    },
    onError: (error) => {
      toast.error("exiting failed");
    },
  });

  const mutation = useMutation(Book, {
    onSuccess: (data) => {
      console.log("haiddd");

      toast.success("booking succesful");
      refetch();
      setSelectedSlot(null);
    },
    onError: (error) => {
      toast.error("booking failed");
    },
  });
  const onSubmit = (dat) => {
    if (data?.slotNumber) {
      console.log("cena");

      const request = {
        slotNumber,
        id: data?.id,
      };
      exitmutation.mutate(request);
    } else {
      console.log("polock");
      const request = {
        slotNumber,
        status: "BOOKED",
        userId: userSession?.userId,
      };

      mutation.mutate(request);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
          {!data?.slotNumber && !isIncluded && (
            <h2 className="text-xl font-semibold mb-4 ">
              Slot is already booked
            </h2>
          )}

          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              {(data?.slotNumber || isIncluded) && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Vehicle Number
                  </label>

                  <>
                    <input
                      {...register("VehicleNumber", {
                        required: "Vehicle Number is required",
                      })}
                      type="text"
                      name="VehicleNumber"
                      className="w-full p-2 border rounded-md"
                      disabled={data?.slotNumber}
                    />
                  </>
                </div>
              )}
              {data?.slotNumber && <Time createdTime={data?.createdAt} />}
              <div className="flex justify-end gap-2">
                <div>
                  <button
                    onClick={() => setSelectedSlot(null)}
                    // type="submit"
                    className=" bg-blue-500 text-white p-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
                {isIncluded && (
                  <>
                    <div>
                      <button
                        type="submit"
                        className=" bg-blue-500 text-white p-2 px-4 rounded-md"
                      >
                        Book
                      </button>
                    </div>
                  </>
                )}
                {data?.slotNumber && (
                  <>
                    <div>
                      <button
                        type="submit"
                        className=" bg-blue-500 text-white p-2 px-4 rounded-md"
                      >
                        Exit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
