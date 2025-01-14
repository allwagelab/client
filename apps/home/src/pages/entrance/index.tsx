import { useNavigate } from 'react-router-dom'

import viteLogo from '/vite.svg'

import { showGlobalToast, useRemoteAuth } from '@allwagelab/message-bus'

const EntrancePage = () => {
  const auth = useRemoteAuth()
  const navigate = useNavigate()
  const goDashboardPage = () => navigate('/home/dashboard')

  const handleToast = () => {
    showGlobalToast('안녕하세요', 'success')
  }

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
      <button type="button" onClick={handleToast}>
        토스트보여줘
      </button>
      <br />
      <p>auth: {JSON.stringify(auth)}</p>
    </>
  )
}

export default EntrancePage
