import { Outlet, Navigate, Link } from 'react-router-dom'

import { css } from '@emotion/react'

import { URLS } from '@allwagelab/constants'
import { useAuth } from '@allwagelab/message-bus'

function Protected() {
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return (
      <div css={protectedLayout}>
        <header>
          <Link to="/login">
            <img src="/logo.svg" alt="Allwage Logo" />
          </Link>
        </header>
        <main>
          <Outlet />
          <div>
            <img src="/login_banner.png" alt="Login Page Banner" />
          </div>
        </main>
      </div>
    )
  }

  return <Navigate to={URLS.APP_HOME} />
}

export default Protected

const protectedLayout = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 1440px;

  header {
    min-height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
  }

  main {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  main > div:nth-of-type(1) {
    margin: auto;
  }

  main > div:nth-of-type(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem 3rem 3.75rem;

    img {
      height: 820px;
    }
  }
`
