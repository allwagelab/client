/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { useAuth } from '@allwagelab/message-bus'

function Header() {
  const auth = useAuth()

  return (
    <header css={headerStyle}>
      <div css={buttonGroupStyle}>
        <img src="/icons/alarm.svg" alt="alarm icon" />
        <img src="/icons/headphone.svg" alt="headphone icon" />
        <img src="/icons/setting.svg" alt="setting icon" />
      </div>
      <div css={userStyle}>
        <Avatar />
        <Label onClick={() => auth.logoutHandler()}>USER NAME</Label>
      </div>
    </header>
  )
}

const headerStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 36px;

  & > div {
    display: flex;
    gap: 8px;
  }
`

const buttonGroupStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;

  & > img {
    padding: 9px;
  }
`

const userStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 24px;
`

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: gray;
`

const Label = styled.span`
  ${({ theme }) => css`
    ${theme.typography.body.b2_rg}
    color: ${theme.colors.gray100};
  `}
  font-weight: 600;
  cursor: pointer;
`

export default Header
