import { base } from '..'

import type { APIResponseType, Employee } from '@allwagelab/schemas'

export const getEmployeeInfo = (id: number) =>
  base.get<APIResponseType<Employee>>(`/employee/${id}`)
