import Bullet from './Bullet'
import Button from './Button'
import SimpleCalendar from './Calandar'
import SelectBox, { type Option } from './SelectBox'

const options1: Option[] = [
  { color: 'bg-green', name: '오픈' },
  { color: 'bg-blue', name: '마감' },
  { color: 'bg-red', name: '야간' },
]

const options2: Option[] = [
  { color: 'bg-blue', name: '주방' },
  { color: 'bg-green', name: '계산' },
  { color: 'bg-red', name: '바' },
]

const options3: Option[] = [
  { color: 'bg-red', name: '홍길동' },
  { color: 'bg-green', name: '김철수' },
  { color: 'bg-blue', name: '박영희' },
]

const DrawerContent3 = () => {
  return (
    <>
      <div className="mt-12">
        <Bullet bulletColor="red" className="mb-[15px]">
          <span className="text-lg font-semibold tracking-custom text-gray-label">
            스케줄 템플릿
          </span>
        </Bullet>
        <div className="mt-4 flex gap-2">
          <SelectBox options={options1} />
        </div>
      </div>
      <div className="mt-9">
        <Bullet bulletColor="red" className="mb-[15px]">
          <span className="text-lg font-semibold tracking-custom text-gray-label">담당 업무</span>
        </Bullet>
        <div className="mt-4 flex gap-2">
          <SelectBox options={options2} />
        </div>
      </div>
      <div className="mt-9">
        <Bullet bulletColor="red" className="mb-[15px]">
          <span className="text-lg font-semibold tracking-custom text-gray-label">근무자</span>
        </Bullet>
        <div className="mt-4 flex gap-2">
          <SelectBox options={options3} />
        </div>
      </div>
      <div className="mt-9">
        <SimpleCalendar />
      </div>
      <div className="mt-9 grid grid-cols-2 gap-5">
        <Button label="취소" />
        <Button label="스케줄 추가" />
      </div>
    </>
  )
}

export default DrawerContent3
