import type { GetEmployeeListParams } from '@/types/getEmployeeList'

const KEY = ['EMPLOYEE']

const LISTS_INFO_KEY = [...KEY, 'LIST']

const LIST_INFO_KEY = (filters: GetEmployeeListParams) => [...LISTS_INFO_KEY, filters]

const PERSONAL_INFO_KEY = [...KEY, 'PERSONAL_INFO']

const STORE_WORK_TYPE_INFO_KEY = [...KEY, 'STORE__WORK_TYPE_INFO']

export { KEY, LISTS_INFO_KEY, LIST_INFO_KEY, PERSONAL_INFO_KEY, STORE_WORK_TYPE_INFO_KEY }
