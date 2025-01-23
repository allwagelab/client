import { base } from '..'

export const getPersonalInfo = (id: number) => base.get(`/employee/${id}`)
