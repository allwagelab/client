import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 428px;
`

export const TitleGroup = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.typography.title.t1_sb}
    color: ${theme.colors.baseBlack};
  `}
`

export const SubTitle = styled.p`
  margin-top: 0.5rem;
  ${({ theme }) => css`
    ${theme.typography.body.b2_rg}
    color: ${theme.colors.baseBlack};
  `}
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1.75rem;
`

export const InputWithButton = styled.div`
  display: flex;
  gap: 8px;

  button {
    min-width: 90px;
  }

  & > div {
    flex: 1;
  }
`

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 100px;
`

export const Label = styled.label`
  ${({ theme }) => css`
    ${theme.typography.body.b4_rg}
    color: ${theme.colors.gray80};
  `}
`

export const SuccessMessage = styled.span`
  ${({ theme }) => css`
    ${theme.typography.body.b4_rg}
    color: ${theme.colors.blue60};
  `}
`
export const ErrorMessage = styled.span`
  ${({ theme }) => css`
    ${theme.typography.body.b4_rg}
    color: ${theme.colors.baseRed};
  `}
`
