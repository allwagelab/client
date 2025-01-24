import { EmployeeApi } from '@/apis'
import { useAuthQuery } from '@/queries/query'

import { PERSONAL_INFO_KEY } from './keys'

function usePersonalInfo() {
  const result = useAuthQuery(PERSONAL_INFO_KEY, () => EmployeeApi.getPersonalInfo(1), {
    staleTime: 0,
    cacheTime: 0,
  })

  return result
}

export default usePersonalInfo
