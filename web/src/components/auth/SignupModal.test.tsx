import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import SignupModal from '@/components/auth/SignupModal'
import { render } from '@/libs/test-utils'

// 모달 렌더링을 위한 wrapper 컴포넌트
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('SignupModal', () => {
  it('renders modal when isOpen is true', () => {
    renderWithRouter(<SignupModal isOpen={true} onClose={() => {}} />)
    expect(screen.getByText('회원가입')).toBeInTheDocument()
  })

  it('does not render modal when isOpen is false', () => {
    renderWithRouter(<SignupModal isOpen={false} onClose={() => {}} />)
    expect(screen.queryByText('회원가입')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    renderWithRouter(<SignupModal isOpen={true} onClose={onClose} />)

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })
})
