import React from "react";

export const Modal = () => {
  return (
    <>
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {/* Book Slot {selectedSlot + 1} */}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // setShowModal(true);
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              //   value={userInfo.name}
              //   onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Car Number</label>
            <input
              type="text"
              name="carNumber"
              //   value={userInfo.carNumber}
              //   onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Proceed to Book
          </button>
        </form>
      </div>
    </>
  );
};
