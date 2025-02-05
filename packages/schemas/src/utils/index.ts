import type { WeekDay } from '../serviceType'

/**
 * 모든 요일이 포함된 배열
 * @constant
 */
export const WEEK_DAYS: readonly WeekDay[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

/**
 * 주어진 날짜가 유효한 요일인지 확인합니다
 * @param {string} day - 확인할 요일
 * @returns {boolean} 유효한 요일이면 true, 아니면 false를 반환합니다
 * @example
 * isWeekDay('monday'); // true를 반환
 * isWeekDay('holiday'); // false를 반환
 */
export function isWeekDay(day: string): day is WeekDay {
  return WEEK_DAYS.includes(day as WeekDay)
}
