import { useAuth } from '@allwagelab/message-bus'

function Header() {
  const auth = useAuth()

  return (
    <header>
      Allwage Lab
      <button type="button" onClick={auth.logoutHandler}>
        logout
      </button>
    </header>
  )
}

export default Header
