import { base } from '..'

import type { APIResponseType, Employee } from '@allwagelab/schemas'

export const getPersonalInfo = (id: number) =>
  base.get<APIResponseType<Employee>>(`/employee/${id}`)
