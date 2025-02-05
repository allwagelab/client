import { useNavigate } from 'react-router-dom'

import { EmployeeQuery } from '@/queries'

const EXAMPLE_EMPLOYEE_ID = 5

const HomePage = () => {
  const { data: emplyees } = EmployeeQuery.useEmployeeList({
    isWorking: true,
  })
  const { data: detailInfo } = EmployeeQuery.useEmployeeInfo(EXAMPLE_EMPLOYEE_ID)

  const navigate = useNavigate()

  return (
    <div>
      <h1>직원관리</h1>
      {emplyees && emplyees.length > 0 ? (
        emplyees.map(item => (
          <li key={item.id}>
            <button>{item.name}</button>
          </li>
        ))
      ) : (
        <p>등록된 직원정보가 없습니다.</p>
      )}
      <ul>직원관리</ul>
      <p>직원 1 상세정보: {JSON.stringify(detailInfo)}</p>
      <button type="button" onClick={() => navigate('/new')}>
        신규 직원 추가
      </button>
    </div>
  )
}

export default HomePage
