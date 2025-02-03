import { base } from '..'

import type { APIResponseType, WorkType } from '@allwagelab/schemas'

export const getStoreWorkTypes = () => base.get<APIResponseType<WorkType[]>>('/employee/work/type')
