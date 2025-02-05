import { EmployeeApi } from '@/apis'
import { useAuthQuery } from '@/queries/query'

import { PERSONAL_INFO_KEY } from './keys'

interface UsePersonalInfoOptions {
  enabled?: boolean
}

function useEmployeeInfo(id: number, options?: UsePersonalInfoOptions) {
  const result = useAuthQuery([...PERSONAL_INFO_KEY, id], () => EmployeeApi.getEmployeeInfo(id), {
    staleTime: 0,
    cacheTime: 0,
    enabled: options?.enabled,
    select: res => res.data.data,
  })

  return result
}

export default useEmployeeInfo
