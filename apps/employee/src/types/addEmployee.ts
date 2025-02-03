import type {
  GenderType,
  WorkType,
  WorkScheduleType,
  SalaryType,
  WorkContractType,
} from '@allwagelab/schemas'

/**
 * 직원을 등록하는 페이지
 * =========================
 *
 * 이벤트 기반 모델링
 * ---------
 * ---------
 * 폼 임력을 다 안했는데 저장 버튼을 누를 수도 있겠네 (form_data_error)
 *
 * 폼 입력을 다 하고 제출하겠네 (form_submitted)
 *   - 유저 입장에서는 필수 값 아닌 필드들을 입력하든 말든 상관없네
 *
 * 성공 여부가 응답이 오겠네 (form_request_received)
 *
 * 성공 여부를 불러오는데 오류가 발생할 수 있겠네 (form_request_received_error)
 */

export type AddEmployeeDomainEvent =
  | {
      type: 'form_data_error'
      errorMessage: string
    }
  | {
      type: 'form_submitted'
      data: {
        /* API 요청 타입 */
      }
    }
  | {
      type: 'form_request_received'
      questionId: '...'
      optionId: '...'
      isCorrect: boolean
    }
  | {
      type: 'form_request_received_error'
      error: {
        /* API 응답 타입 */
      }
    }

/**
 * 직원의 기본 개인정보를 나타내는 타입입니다.
 */
export interface EmployeePersonalInfo {
  /** 이름 */
  name: string

  /** 생년월일 (YYYY-MM-DD) */
  birth: string

  /** 성별 */
  gender: GenderType

  /** 휴대폰 번호 (예: 010-1234-5678) */
  hp: string

  /** 이메일 주소 */
  email: string

  /** 기본 주소 */
  address: string

  /** 상세 주소 */
  address2: string
}

/**
 * 직원의 첨부 파일 정보를 나타내는 타입입니다.
 * 모든 필드는 선택적입니다.
 */
export interface EmployeeAttachments {
  /** 프로필 사진 (바이너리) */
  profile?: string

  /** 근로계약서 (바이너리) */
  contract?: string

  /** 보건증 (바이너리) */
  health?: string
}

/**
 * 직원의 근로 계약 정보를 나타내는 타입입니다.
 */
export interface EmployeeContractInfo {
  /** 입사일자 (YYYY-MM-DD) */
  startDate: string

  /** 퇴사일자 (YYYY-MM-DD) - 미입력 시 계약 종료 일자가 정해지지 않은 경우입니다. */
  endDate?: string

  /** 급여 형태 */
  salaryType: SalaryType

  /** 급여액 */
  salaryValue: number

  /** 담당 업무 */
  workType: WorkType

  /** 근로 계약 형태 */
  workContractType: WorkContractType

  /** 근무 일정 정보 */
  workSchedule: WorkScheduleType
}

/**
 * 직원 등록 API 요청 데이터 타입입니다.
 * @example
 * const newEmployee: CreateEmployeeRequest = {
 *   name: "홍길동",
 *   birth: "1990-01-01",
 *   gender: "MALE",
 *   hp: "010-1234-5678",
 *   email: "hong@example.com",
 *   address: "서울시 강남구",
 *   address2: "123-456",
 *   profile: "base64...",
 *   startDate: "2024-01-01",
 *   salaryType: "MONTHLY",
 *   salaryValue: 3000000,
 *   workType: "SERVICE",
 *   workContractType: "FULL_TIME",
 *   workSchedule: {
 *     weekly_work_type: "fixed",
 *     weekly_work_hour: 40,
 *     work_days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
 *     work_type: "work",
 *     work_hour: ['08:00', '17:00'],
 *     rest_hour: 1
 *   }
 * };
 */
export type AddEmployeeRequest = EmployeePersonalInfo &
  Partial<EmployeeAttachments> &
  EmployeeContractInfo

/**
 * 직원 등록 API 응답 데이터 타입
 */
interface CreateEmployeeResponse {
  /** 등록된 직원 이름 */
  name: string
  /** 등록된 직원 이메일 */
  email: string
}

/**
 * 직원 등록 API 에러 응답 타입
 */
interface CreateEmployeeErrorResponse {
  /** 에러 메시지 */
  message: 'Bad Request' | 'Not Found'
}

/**
 * 직원 등록 API의 성공 또는 실패 응답을 나타내는 타입입니다.
 *
 * @example
 * // 성공 응답
 * const successResponse: AddEmployeeResponse = {
 *   name: "홍길동",
 *   email: "hong@example.com"
 * }
 *
 * // 실패 응답
 * const errorResponse: AddEmployeeResponse = {
 *   message: "Bad Request"
 * }
 */
export type AddEmployeeResponse = CreateEmployeeResponse | CreateEmployeeErrorResponse
