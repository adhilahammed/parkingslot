import { useNavigate } from "react-router";
import { useUserSessionStore } from "../../store/userSession";

const Header = () => {
  const userSession = useUserSessionStore((state) => state.session);
  const logoutSession = useUserSessionStore((state) => state.logout);
  const navigate = useNavigate();
  const logoutAction = () => {
    logoutSession();
    navigate("/login");
  };
  return (
    <div className="bg-blue-800 flex justify-between py-2 px-3 w-full items-center">
      <div className="flex gap-2"></div>
      <div className="flex gap-1 items-center">
        <button
          onClick={logoutAction}
          style={{
            backgroundColor: "white",
            color: "#1e3a8a",
            padding: "0px 10px",
            borderRadius: "2px",
          }}
        >
          {userSession?.userId ? "logout" : "login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
