import axios from 'axios'

const base = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
})

export { base }

export * as AuthApi from './auth'
export * as EmployeeApi from './employee'
