import type { GetEmployeeListParams } from '@/types/getEmployeeList'

const KEY = ['EMPLOYEE']

const LIST_KEY = [...KEY, 'LIST']

const LIST_INFO_KEY = (filters: GetEmployeeListParams) => [...LIST_KEY, filters]

const PERSONAL_INFO_KEY = [...KEY, 'PERSONAL_INFO']

const STORE_WORK_TYPE_INFO_KEY = [...KEY, 'STORE_WORK_TYPE_INFO']

export { KEY, LIST_KEY, LIST_INFO_KEY, PERSONAL_INFO_KEY, STORE_WORK_TYPE_INFO_KEY }
