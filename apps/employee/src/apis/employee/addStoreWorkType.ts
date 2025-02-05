import { base } from '..'

import type { APIResponseType } from '@allwagelab/schemas'

import type { EmployeeWorkType } from '@/types/addStoreWorkType'

export const addStoreWorkType = (body: EmployeeWorkType) =>
  base.post<APIResponseType<EmployeeWorkType>>('/employee/work', body)
