interface AuthServiceConfig {
  tokenKey: string
  encode?: (token: string) => string
  decode?: (encodedToken: string) => string
}

export class AuthService {
  private token: string | null = null
  private tokenKey: string
  private encode: (token: string) => string
  private decode: (encodedToken: string) => string

  constructor(config: AuthServiceConfig) {
    this.tokenKey = config.tokenKey
    this.encode = config.encode ?? ((token: string) => token)
    this.decode = config.decode ?? ((token: string) => token)

    // Initialize token from storage
    const encodedToken = localStorage.getItem(this.tokenKey)
    if (encodedToken) {
      this.token = this.decode(encodedToken)
    }
  }

  getToken(): string | null {
    return this.token
  }

  setToken(token: string, persist = true): void {
    this.token = token

    if (persist) {
      const encodedToken = this.encode(token)
      localStorage.setItem(this.tokenKey, encodedToken)
    }
  }

  clearToken(): void {
    this.token = null
    localStorage.removeItem(this.tokenKey)
  }

  handleLogin({
    accessToken,
    autoLogin = false,
  }: {
    accessToken: string
    autoLogin?: boolean
  }): void {
    this.setToken(accessToken, autoLogin)
  }

  handleLogout(): void {
    this.clearToken()
  }

  handleTokenRefresh({ accessToken }: { accessToken: string }): void {
    this.setToken(accessToken)
  }
}
