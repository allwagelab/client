import { useShallow } from "zustand/shallow";

import { useAuthStore } from "@/stores/auth";
import Cookies from "js-cookie";

function LoginPage() {
  const { setAuth } = useAuthStore(
    useShallow((state) => ({
      setAuth: state.setAuth,
    }))
  );

  const requestLogin = () => {
    Cookies.set("hi", "Hola!");
    setAuth({
      accessToken: "foo",
      refreshToken: "bar",
    });
  };

  return (
    <div>
      <h1>Allwage Lab Login Page</h1>
      <button type="button" onClick={requestLogin}>
        login
      </button>
    </div>
  );
}

export default LoginPage;
