import { EmployeeQuery } from '@/queries'

const EXAMPLE_EMPLOYEE_ID = 1

const HomePage = () => {
  const { data: emplyees } = EmployeeQuery.useEmployeeList()

  const { data: detailInfo } = EmployeeQuery.usePersonalInfo(EXAMPLE_EMPLOYEE_ID)

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
    </div>
  )
}

export default HomePage
