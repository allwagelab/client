import axios from 'axios'

import { BASE_URL } from './baseUrl'

export const renewAccessToken = async () => {
  const {
    data: { data },
  } = await axios.post<{ data: { accessToken: string } }>(
    `${BASE_URL.SERVER}/auth/refresh/token`,
    {},
    {
      withCredentials: true,
    },
  )

  return data
}
