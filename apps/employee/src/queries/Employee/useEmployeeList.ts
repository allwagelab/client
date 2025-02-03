import { EmployeeApi } from '@/apis'
import { useAuthQuery } from '@/queries/query'

import { PERSONAL_INFO_KEY } from './keys'

function useEmployeeList() {
  const result = useAuthQuery(
    PERSONAL_INFO_KEY,
    () => EmployeeApi.getEmployeeList({ isWorking: true, date: true }),
    {
      staleTime: 0,
      cacheTime: 0,
      select: res => res.data.data,
    },
  )

  return result
}

export default useEmployeeList
