import { useMessageBus } from '@allwagelab/message-bus'

import { EmployeeQuery } from '@/queries'
import { useAuthStore } from '@/stores/auth'

const HomePage = () => {
  const messageBus = useMessageBus()
  const { data } = EmployeeQuery.usePersonalInfo()

  const { token } = useAuthStore(state => state)

  const clickHoho = () => {
    messageBus.publishEvent('auth:token-refresh', { accessToken: 'createhb21', source: 'remote' })
  }

  return (
    <h1>
      직원관리
      <br />
      <button type="button" onClick={clickHoho}>
        hoho
      </button>
      <p>token: {token}</p>
      <br />
      <p>{JSON.stringify(data)}</p>
    </h1>
  )
}

export default HomePage
