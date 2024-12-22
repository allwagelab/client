import axios, { type AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://3.39.76.11:4001/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export { axiosInstance }
