import { useAddEmployee } from '@/queries/Employee'

const AddEmployeePage = () => {
  const { mutate } = useAddEmployee()

  const onSubmit = () => {
    mutate({
      name: '홍길동',
      birth: '1990-01-01',
      gender: 'MALE',
      hp: '010-1234-5678',
      email: 'hong@example.com',
      address: '서울시 강남구',
      address2: '123-456',
      profile: 'base64...',
      startDate: '2024-01-01',
      salaryType: 'MONTHLY',
      salaryValue: 3000000,
      workType: 'SERVICE',
      workContractType: 'FULL_TIME',
      workSchedule: {
        weekly_work_type: 'fixed',
        weekly_work_hour: 40,
        work_days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        work_type: 'work',
        work_hour: ['08:00', '17:00'],
        rest_hour: 1,
      },
    })
  }

  return (
    <div>
      <h1>직원 등록</h1>
      <button onClick={onSubmit}>test</button>
    </div>
  )
}

export default AddEmployeePage
