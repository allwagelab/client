import { base } from '@/apis'

const PATH = '/auth'

const renewAccessToken = () => base.post<{ data: { accessToken: string } }>(`${PATH}/refresh/token`)

export { renewAccessToken }
