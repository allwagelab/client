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

/**
 * 직원 목록 조회 API의 쿼리 파라미터 타입입니다.
 * @interface GetEmployeeListParams
 *
 * @example
 * // 입사일 순으로 재직 중인 직원 조회
 * const params: GetEmployeeListParams = {
 *   date: true,
 *   isWorking: true
 * }
 *
 * // 이름순으로 전체 직원 조회
 * const params: GetEmployeeListParams = {
 *   orderBy: 'name'
 * }
 */
export interface GetEmployeeListParams {
  /**
   * 입사일 기준 정렬 여부
   * - true: 입사일 순으로 정렬
   * - false 또는 미입력: 기본 정렬
   */
  date?: boolean

  /**
   * 재직 여부 필터
   * - true: 재직 중인 직원만 조회
   * - false: 퇴사한 직원만 조회
   * - 미입력: 전체 직원 조회
   */
  isWorking?: boolean

  /**
   * 정렬 기준
   * - name: 이름순 정렬
   * - workType: 직무 유형별 정렬
   * - workContractType: 계약 형태별 정렬
   */
  orderBy?: EmployeeListOrderBy
}
