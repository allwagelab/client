import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { useTimer } from '@/hooks'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with given seconds', () => {
    const { result } = renderHook(() => useTimer({ initialSeconds: 60 }))
    expect(result.current.seconds).toBe(60)
  })

  it('should count down when started', () => {
    const { result } = renderHook(() => useTimer({ initialSeconds: 60 }))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.seconds).toBe(59)
  })

  it('should call onEnd when timer reaches zero', () => {
    const onEnd = vi.fn()
    const { result } = renderHook(() => useTimer({ initialSeconds: 2, onEnd }))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(onEnd).toHaveBeenCalled()
    expect(result.current.seconds).toBe(0)
  })
})
