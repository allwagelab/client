import { EmployeeApi } from '@/apis'
import { useAuthQuery } from '@/queries/query'
import type { GetEmployeeListParams } from '@/types/getEmployeeList'

import { LIST_INFO_KEY } from './keys'

function useEmployeeList(filters: GetEmployeeListParams) {
  const result = useAuthQuery(LIST_INFO_KEY(filters), () => EmployeeApi.getEmployeeList(filters), {
    staleTime: 0,
    cacheTime: 0,
    select: res => res.data.data,
  })

  return result
}

export default useEmployeeList
