import { useState } from "react";

import Parking from "./pages/parkingslot/Parking";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Approuter from "./Approuter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);
  const createdTime = "2024-12-12T12:00:00Z";

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Approuter />
        <ToastContainer
          position="top-right"
          autoClose={3000} // Auto-close duration in ms
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" // You can also use "dark"
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
