import { useShallow } from 'zustand/shallow'
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import { useAuthStore } from '@/stores/auth'
import { typographyStyle } from '@allwagelab/design'

function LoginPage() {
  const { setAuth } = useAuthStore(
    useShallow((state) => ({
      setAuth: state.setAuth,
    })),
  )

  const requestLogin = () => {
    setAuth({
      accessToken: 'foo',
      refreshToken: 'bar',
    })
  }

  // @allwagelab/design 사용 예시, useTheme()를 통해 테마를 사용할 수 있습니다.
  const { typography, typographyInlineStyle, colors } = useTheme()

  return (
    <Container>
      <Heading>Allwage Lab Login Page - Headline</Heading>
      <Title>Allwage Lab Login Page - Title</Title>
      <div css={[typographyInlineStyle.body.b1_rg, { color: colors.green70 }]}>
        Allwage Lab Login Page - Body
      </div>
      <div
        css={css`
          ${typography.caption.c1_rg};
          color: ${colors.orange20};
        `}
      >
        Allwage Lab Login Page - Caption
      </div>
      <button type="button" onClick={requestLogin}>
        login
      </button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

// @allwagelab/design 사용 예시, typographyStyle()를 통해 테마를 사용할 수 있습니다.
const Heading = styled.div`
  ${({ theme }) => css`
    ${typographyStyle('headline.h1_sb')}
    color: ${theme.colors.baseRed};
  `}
`

// @allwagelab/design 사용 예시, theme.typography을 통해 테마를 사용할 수 있습니다.
const Title = styled.div`
  ${({ theme }) => css`
    ${theme.typography.title.t1_sb}
    color: ${theme.colors.blue70};
  `}
`

export default LoginPage
