import { useState } from 'react'

const generateCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()

  const calendar: number[] = []
  for (let i = 0; i < firstDay; i++) {
    calendar.push(0)
  }
  for (let day = 1; day <= totalDays; day++) {
    calendar.push(day)
  }

  return calendar
}

const SimpleCalendar: React.FC = () => {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const calendarDays = generateCalendar(currentYear, currentMonth)

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1)
      setCurrentMonth(11)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1)
      setCurrentMonth(0)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="mx-auto rounded-lg text-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={goToPrevMonth}
          onKeyDown={() => {}}
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold">
          {currentYear}년 {currentMonth + 1}월
        </h2>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={goToNextMonth}
          onKeyDown={() => {}}
        >
          &gt;
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-center font-semibold text-gray-600">
        {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center">
        {calendarDays.map((day) => (
          <div
            key={day}
            className={`py-2 ${
              day === 0 ? 'invisible' : 'cursor-pointer rounded hover:bg-blue-200'
            } ${
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()
                ? 'bg-blue-500 font-bold text-white'
                : ''
            }`}
          >
            {day !== 0 && day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SimpleCalendar
