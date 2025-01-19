import { Outlet, Navigate } from 'react-router-dom'

import { css } from '@emotion/react'

import { URLS } from '@allwagelab/constants'
import { useAuth } from '@allwagelab/message-bus'

import { UiComponent } from '@/components'

function Private() {
  const auth = useAuth()

  if (auth.isAuthenticated) {
    return (
      <div css={privateLayout}>
        <UiComponent.Header />
        <UiComponent.Navigation />
        <main>
          <Outlet />
        </main>
      </div>
    )
  }

  return <Navigate to={URLS.APP_START} />
}

const privateLayout = css`
  aside ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 100px;
  }

  aside ul li {
    cursor: pointer;
  }

  main {
    position: absolute;
    top: 60px;
    left: 20%;
    max-height: calc(100% - 60px);
    max-width: calc(100% - 20%);
    padding: 2rem;
  }

  button {
    border: none;
    outline: none;
    background-color: aquamarine;
  }
`

export default Private
