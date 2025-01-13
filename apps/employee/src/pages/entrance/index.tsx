import { useRemoteAuth } from '@allwagelab/message-bus'

const EntrancePage = () => {
  const auth = useRemoteAuth()

  const clickHo = () => {
    auth.refreshTokenHandler({ accessToken: 'createhb21' })
  }

  return (
    <>
      <h1>직원관리</h1>
      <p>auth: {JSON.stringify(auth)}</p>
      <br />
      <button onClick={clickHo}>ho</button>
    </>
  )
}

export default EntrancePage
