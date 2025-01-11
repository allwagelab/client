import axios, { type AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: '/api',
})

export { axiosInstance }
=======
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const axiosPrivateInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export { axiosInstance, axiosPrivateInstance }
>>>>>>> develop
