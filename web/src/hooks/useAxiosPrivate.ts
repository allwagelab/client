import { useEffect } from 'react'

import { useAuth } from '@allwagelab/message-bus'

import { axiosPrivateInstance } from '@/apis'

import { useRefreshToken } from './useRefreshToken'

export const useAxiosPrivate = () => {
  const auth = useAuth()
  const renewAccessToken = useRefreshToken()

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await renewAccessToken()
          console.log(newAccessToken)
          // prevRequest.headers.Authorization = `Bearer ${newAccessToken}`
          // return axiosPrivateInstance(prevRequest)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept)
      axiosPrivateInstance.interceptors.response.eject(responseIntercept)
    }
  }, [auth, renewAccessToken])

  return axiosPrivateInstance
}
