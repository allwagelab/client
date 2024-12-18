import { useReducer } from "react";
import Cookies from "js-cookie";

import viteLogo from "/vite.svg";
import { useNavigate } from "react-router-dom";

const EntrancePage = () => {
  const [showCookie, toggleCookie] = useReducer((show) => !show, false);

  const getCookieString = () => Cookies.get("hi") ?? "안녕하세요";

  const navigate = useNavigate();
  const goDashboardPage = () => navigate("/schedule/dashboard");

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Allwagelab 근무 관리</h1>
      <button type="button" onClick={toggleCookie}>
        선물이 쿠키에 들어있어요.
      </button>
      {showCookie && <p>{getCookieString()}</p>}
      <br />
      <button type="button" onClick={goDashboardPage}>
        정영웅 근무 조정하기
      </button>
    </>
  );
};

export default EntrancePage;
