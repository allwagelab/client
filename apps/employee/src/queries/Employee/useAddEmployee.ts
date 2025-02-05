import { EmployeeApi } from '@/apis'
import { useAuthMutation } from '@/queries/query'

function useAddEmployee() {
  return useAuthMutation(EmployeeApi.addEmployee)
}

export default useAddEmployee
