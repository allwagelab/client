import axios, { type AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

const createAxiosInstance = () =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

const axiosInstance: AxiosInstance = createAxiosInstance()
const axiosPrivateInstance: AxiosInstance = createAxiosInstance()

export { axiosInstance, axiosPrivateInstance }
