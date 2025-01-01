import { css } from '@emotion/react'
import { Outlet, Navigate } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'

import { useAuthStore } from '@/stores/auth'

function Protected() {
  const { auth } = useAuthStore(
    useShallow((state) => ({
      auth: state.auth,
    })),
  )

  if (!auth?.accessToken) {
    return (
      <div css={protectedLayout}>
        <header>All wage</header>
        <main>
          <Outlet />
          <div>이미지</div>
        </main>
      </div>
    )
  }

  return <Navigate to={'/home'} />
}

export default Protected

const protectedLayout = css`
  display: flex;
  flex-direction: column;
  height: 100vh;

  header {
    height: 80px;
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

  main > div:nth-child(2) {
    background-color: #457dff;
    margin: 0.5rem 3rem 3.75rem;
    border-radius: 1rem;
  }
`
