import { BrowserRouter, Route, Routes } from "react-router";

import NotFoundPage from "./pages/notfound/notfound";
import { Login } from "./pages/login/login";
import { Signup } from "./pages/signup/signup";
import { Authlayout } from "./components/auth/authlayout";

import Parking from "./pages/parkingslot/Parking";
import Test from "./components/test/Test";

const Approuter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Authlayout />}>
          <Route path="/home" element={<Parking />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Approuter;
