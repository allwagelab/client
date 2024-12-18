import viteLogo from "/vite.svg";
import { useNavigate } from "react-router-dom";

const EntrancePage = () => {
  const navigate = useNavigate();
  const goDashboardPage = () => navigate("/home/dashboard");

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Allwagelab 홈</h1>

      <p>추가적인 회사 정보 기입이 필요해요</p>
      <br />
      <button type="button" onClick={goDashboardPage}>
        기입하러가기
      </button>
    </>
  );
};

export default EntrancePage;
