import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useRefreshToken } from './useRefreshToken'

import { axiosPrivateInstance } from '@/apis'
import { useAuthStore } from '@/stores/auth'

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const auth = useAuthStore(useShallow((state) => state.auth))

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
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
  }, [auth, refresh])

  return axiosPrivateInstance
}
