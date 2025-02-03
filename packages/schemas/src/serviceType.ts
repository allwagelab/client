/**
 * 비즈니스 로직에 사용되면서 공용으로 사용되는 타입을 모아놓은 모듈입니다.
 */

export type APIResponseType<TData> = {
  data: TData
  success: boolean
}

/**
 * 성별을 나타내는 타입입니다.
 *
 * @example
 * const gender: GenderType = 'MALE'; // 유효함
 * const gender: GenderType = 'OTHER'; // 에러: 'OTHER' 타입은 'GenderType' 타입에 할당할 수 없습니다
 */
export type GenderType = 'MALE' | 'FEMALE'

/**
 * 직무 유형을 나타내는 타입입니다.
 * @typedef {string} WorkType
 *
 * @description
 * 가능한 직무 유형들:
 * - SERVICE: 서비스
 * - KITCHEN: 주방
 * - SERVING: 서빙
 * - STORE_MANAGEMENT: 매장관리
 * - SIMPLE_LABOR: 단순노무
 * - OFFICE_ASSISTANT: 사무보조
 * - EVENT_ASSISTANT: 행사보조
 * - DELIVERY: 운반
 * - MARKETING: 마케팅
 * - EDUCATION: 교육
 *
 * @example
 * // 직무 유형 사용 예시
 * const workType: WorkType = 'SERVICE'; // 유효함
 * const workType: WorkType = 'COOKING'; // 에러: 'COOKING' 타입은 'WorkType' 타입에 할당할 수 없습니다
 */
export type WorkType =
  | 'SERVICE'
  | 'KITCHEN'
  | 'SERVING'
  | 'STORE_MANAGEMENT'
  | 'SIMPLE_LABOR'
  | 'OFFICE_ASSISTANT'
  | 'EVENT_ASSISTANT'
  | 'DELIVERY'
  | 'MARKETING'
  | 'EDUCATION'

/**
 * 일주일의 모든 요일을 나타냅니다 (월요일부터 일요일까지)
 * @example
 * const day: WeekDay = 'monday'; // 유효함
 * const day: WeekDay = 'holiday'; // 에러: 'holiday' 타입은 'WeekDay' 타입에 할당할 수 없습니다
 */
export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

/**
 * 근무 상태를 나타내는 타입입니다.
 *
 * @description
 * 가능한 근무 상태:
 * - holiday: 휴무일
 * - work: 근무일
 * - etc: 기타
 *
 * @example
 * const status: WorkStatus = 'work'; // 유효함
 * const status: WorkStatus = 'rest'; // 에러: 'REST' 타입은 'WorkStatus' 타입에 할당할 수 없습니다
 */
export type WorkStatus = 'holiday' | 'work' | 'etc'

/**
 * 주간 근무 형태를 나타내는 타입입니다.
 *
 * @description
 * 가능한 주간 근무 형태:
 * - schedule: 스케줄 근무 (유동적인 근무 일정)
 * - fixed: 고정 근무 (정해진 요일에 근무)
 *
 * @example
 * // 스케줄 근무자 설정
 * const weeklyStatus: WeeklyWorkStatus = 'schedule'; // 유효함
 *
 * // 고정 근무자 설정
 * const weeklyStatus: WeeklyWorkStatus = 'fixed'; // 유효함
 *
 * // 잘못된 값 설정
 * const weeklyStatus: WeeklyWorkStatus = 'flexible'; // 에러: 'flexible' 타입은 'WeeklyWorkStatus' 타입에 할당할 수 없습니다
 */
export type WeeklyWorkStatus = 'schedule' | 'fixed'
