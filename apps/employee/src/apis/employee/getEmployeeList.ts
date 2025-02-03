import { base } from '..'

import type { APIResponseType, Employee } from '@allwagelab/schemas'

/**
 * 직원 목록의 정렬 기준을 나타내는 타입입니다.
 *
 * @description
 * 가능한 정렬 기준:
 * - name: 이름순 정렬
 * - workType: 직무 유형별 정렬
 * - workContractType: 계약 형태별 정렬
 */
type EmployeeListOrderBy = 'name' | 'workType' | 'workContractType'

export interface GetEmployeeListParams {
  date?: boolean // 입사일 순으로 보여줄것인가
  isWorking?: boolean // 재직 중인 직원인가
  orderBy?: EmployeeListOrderBy // 정렬 기준
}

export const getEmployeeList = (params: GetEmployeeListParams) =>
  base.get<APIResponseType<Employee[]>>('/employee', {
    params,
  })
