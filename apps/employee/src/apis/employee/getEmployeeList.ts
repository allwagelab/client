import { base } from '..'

import type { APIResponseType, Employee } from '@allwagelab/schemas'

import type { GetEmployeeListParams } from '@/types/getEmployeeList'

export const getEmployeeList = (params: GetEmployeeListParams) =>
  base.get<APIResponseType<Employee[]>>('/employee', {
    params,
  })
