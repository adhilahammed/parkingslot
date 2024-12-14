import { Outlet } from "react-router";
import Header from "../header/header";

export const Authlayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
