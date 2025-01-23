import { base } from '@/apis'

const PATH = '/v1/auth'

const refreshToken = () => base.post(`${PATH}/refresh/token`)

export { refreshToken }
