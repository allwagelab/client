import { EmployeeApi } from '@/apis'
import { useAuthMutation } from '@/queries/query'

function useAddStoreWorkType() {
  return useAuthMutation(EmployeeApi.addStoreWorkType)
}

export default useAddStoreWorkType
