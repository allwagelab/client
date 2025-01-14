import { useState, useCallback } from 'react'

interface StorageConfig {
  tokenKey: string
  encode?: (token: string) => string
  decode?: (encodedToken: string) => string
}

const defaultEncode = (token: string) => token
const defaultDecode = (encodedToken: string) => encodedToken

export function useAuthStorage({
  tokenKey,
  encode = defaultEncode,
  decode = defaultDecode,
}: StorageConfig) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null

    const encodedToken = localStorage.getItem(tokenKey)
    if (!encodedToken) return null

    return decode(encodedToken)
  })

  const saveToken = useCallback(
    (newToken: string) => {
      const encodedToken = encode(newToken)
      localStorage.setItem(tokenKey, encodedToken)
      setToken(newToken)
    },
    [encode],
  )

  const removeToken = useCallback(() => {
    localStorage.removeItem(tokenKey)
    setToken(null)
  }, [])

  return {
    token,
    saveToken,
    removeToken,
  }
}
