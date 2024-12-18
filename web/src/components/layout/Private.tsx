import { Outlet, Navigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { useAuthStore } from "@/stores/auth";
import { UiComponent } from "@/components";

function Private() {
  const { auth } = useAuthStore(
    useShallow((state) => ({
      auth: state.auth,
    }))
  );

  if (auth?.accessToken) {
    return (
      <>
        <UiComponent.Header />
        <UiComponent.Navigation />
        <main>
          <Outlet />
        </main>
      </>
    );
  }

  return <Navigate to={"/"} />;
}

export default Private;
