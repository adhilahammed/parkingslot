import React from "react";

export const Popup = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="flex w-full h-screen justify-center items-center">
        <div className="bg-white w-full mx-8 max-w-3xl shadow-lg p-4">
          <div
            style={{
              border: "1px solid #ddd",
              padding: "4px 4px",
              borderRadius: "5px",
            }}
          >
            <div>
              <span>Rate this Product</span>
            </div>
          </div>
          <div
            style={{
              // border: "1px solid #ddd",
              // margin: "10px 0px",
              padding: "10px 0px",
            }}
          >
            <div>
              <span>Review the product</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <div>
              <button
                // onClick={() => setPop(false)}
                style={{
                  backgroundColor: " #1e3a8a",
                  color: "#ffffff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
            </div>
            <div
              style={{
                backgroundColor: " #1e3a8a",
                color: "#ffffff",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              <button
              //   onClick={Submit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
