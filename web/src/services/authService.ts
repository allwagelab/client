import { AuthService } from '@allwagelab/message-bus'

import { tokenKey, encode, decode } from '@/data'

export const authService = new AuthService({ tokenKey, encode, decode })
