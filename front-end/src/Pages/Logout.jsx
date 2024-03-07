import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthConsumer } from "../store/auth";

function Logout() {
  const { logoutUser } = AuthConsumer();

  useEffect(() => {
    localStorage.removeItem("jwtToken");
    logoutUser();
  }, [logoutUser]);

  return (
    <>
      <Navigate to="/"></Navigate>
    </>
  );
}

export default Logout;
