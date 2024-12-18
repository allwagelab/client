import { Outlet, Navigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { useAuthStore } from "@/stores/auth";

function Protected() {
  const { auth } = useAuthStore(
    useShallow((state) => ({
      auth: state.auth,
    }))
  );

  if (!auth?.accessToken) {
    return <Outlet />;
  }

  return <Navigate to={"/home"} />;
}

export default Protected;
