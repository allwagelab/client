import { css } from '@emotion/react'
import styled from '@emotion/styled'

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
