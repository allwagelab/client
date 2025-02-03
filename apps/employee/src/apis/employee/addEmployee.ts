import { base } from '..'

import type { APIResponseType } from '@allwagelab/schemas'

import type { AddEmployeeResponse, AddEmployeeRequest } from '@/types/addEmployee'

export const addEmployee = (body: AddEmployeeRequest) =>
  base.post<APIResponseType<AddEmployeeResponse>>('/employee', body)
