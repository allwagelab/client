import { useRemoteAuth } from '@allwagelab/message-bus'

const DashboardPage = () => {
  const auth = useRemoteAuth()

  return (
    <div>
      <p>정영웅님의 근무를 다음과 같이 조정할게요.</p>
      <br />
      <p>auth: {JSON.stringify(auth)}</p>
    </div>
  )
}

export default DashboardPage
