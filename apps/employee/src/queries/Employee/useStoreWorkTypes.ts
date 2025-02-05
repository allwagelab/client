import { EmployeeApi } from '@/apis'
import { useAuthQuery } from '@/queries/query'

import { STORE_WORK_TYPE_INFO_KEY } from './keys'

interface UsePersonalInfoOptions {
  enabled?: boolean
}

function useStoreWorkType(options?: UsePersonalInfoOptions) {
  const result = useAuthQuery(STORE_WORK_TYPE_INFO_KEY, EmployeeApi.getStoreWorkTypes, {
    staleTime: 0,
    cacheTime: 0,
    enabled: options?.enabled,
    select: res => res.data.data,
  })

  return result
}

export default useStoreWorkType
