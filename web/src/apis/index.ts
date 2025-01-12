import axios, { type AxiosInstance } from 'axios'

const createAxiosInstance = () =>
  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

const axiosInstance: AxiosInstance = createAxiosInstance()
const axiosPrivateInstance: AxiosInstance = createAxiosInstance()

export { axiosInstance, axiosPrivateInstance }
