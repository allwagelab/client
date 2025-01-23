import { decryptAES, encryptAES } from '@allwagelab/utils'

export const tokenKey = import.meta.env.VITE_TOKEN_KEY
export const CRYPTO_SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET_KEY

export const encode = (token: string) => encryptAES(token, CRYPTO_SECRET_KEY)
export const decode = (encodedToken: string) => decryptAES(encodedToken, CRYPTO_SECRET_KEY)
