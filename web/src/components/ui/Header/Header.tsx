/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { useAuth } from '@allwagelab/message-bus'
import { Avatar } from '@allwagelab/react'

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
        <Avatar size="sm" />
        <Label onClick={() => auth.logout()}>USER NAME</Label>
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

const Label = styled.span`
  ${({ theme }) => css`
    ${theme.typography.body.b2_rg}
    color: ${theme.colors.gray100};
  `}
  font-weight: 600;
  cursor: pointer;
`

export default Header
