import Bullet from './Bullet'
import Button from './Button'
import SelectBox, { type Option } from './SelectBox'
import TitleValue from './TitleValue'

const options1: Option[] = [
  { color: 'bg-red', name: '홍길동' },
  { color: 'bg-green', name: '김철수' },
  { color: 'bg-blue', name: '박영희' },
]

const options2: Option[] = [
  { color: 'bg-green', name: '오픈' },
  { color: 'bg-blue', name: '마감' },
  { color: 'bg-red', name: '야간' },
]

const options3: Option[] = [
  { color: 'bg-blue', name: '주방' },
  { color: 'bg-green', name: '계산' },
  { color: 'bg-red', name: '바' },
]

const ModalContent2 = () => {
  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-8">
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <Bullet className="w-[164px]" bulletColor="red">
              <span className="tracking-custom text-[#33333E]">근무자</span>
            </Bullet>
            <SelectBox options={options1} />
          </div>
          <div className="flex items-center justify-between">
            <Bullet className="w-[164px]" bulletColor="red">
              <span className="tracking-custom text-[#33333E]">스케줄 근무 이름</span>
            </Bullet>
            <SelectBox options={options2} />
          </div>
          <div className="flex items-center justify-between">
            <Bullet className="w-[164px]" bulletColor="red">
              <span className="tracking-custom text-[#33333E]">담당 업무</span>
            </Bullet>
            <SelectBox options={options3} />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <TitleValue title="근무일">2024.10.01 (월)</TitleValue>
          <TitleValue title="담당 업무">주방</TitleValue>
          <TitleValue title="근무 시간">
            <div className="flex items-center gap-2">
              <input
                className="w-full rounded-lg border border-gray-border px-3.5 py-2 text-sm tracking-custom placeholder:text-placeholder"
                placeholder="오전 9:00"
              />
              ~
              <input
                className="w-full rounded-lg border border-gray-border px-3.5 py-2 text-sm tracking-custom placeholder:text-placeholder"
                placeholder="오후 12:00"
              />
            </div>
          </TitleValue>
          <TitleValue title="휴게 시간">
            <div className="flex items-center gap-2">
              <input
                className="w-full rounded-lg border border-gray-border px-3.5 py-2 text-sm tracking-custom placeholder:text-placeholder"
                placeholder="오전 9:30"
              />
              ~
              <input
                className="w-full rounded-lg border border-gray-border px-3.5 py-2 text-sm tracking-custom placeholder:text-placeholder"
                placeholder="오전 10:30"
              />
            </div>
          </TitleValue>
          <TitleValue title="근무자">정영웅</TitleValue>
        </div>
      </div>
      <div className="mt-9 grid grid-cols-2 gap-5">
        <Button label="취소" />
        <Button label="정보 추가" />
      </div>
    </>
  )
}

export default ModalContent2
