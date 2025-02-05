import type { GenderType, WeekDay, WeeklyWorkStatus, WorkStatus, WorkType } from './serviceType'

export interface Employee {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  memberId: number
  name: string
  birth: string
  gender: GenderType
  hp: string
  email: string
  address: string
  address2: string
  profile: string[]
  startDate: string
  endDate: string
  salaryType: string
  salaryValue: number
  workType: WorkType
  workContractType: string // 스웨거 타입 업데이트 되면 수정
  workSchedule: {
    rest_hour: number
    work_days: WeekDay[]
    work_hour: string[]
    work_type: WorkStatus
    weekly_work_hour: number
    weekly_work_type: WeeklyWorkStatus
  }
  contract: string[]
  health: string[]
  isWorking: boolean
}
