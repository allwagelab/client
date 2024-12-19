import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/16/solid'
import Bullet, { type Colors } from './Bullet'

const templates: {
  id: number
  name: string
  time: string
  color: Colors
}[] = [
  {
    id: 1,
    name: '오전',
    time: '근무 오전 9:00~오후 1:00',
    color: 'red',
  },
  {
    id: 2,
    name: '오후',
    time: '근무 오후 6:00~오후 10:00',
    color: 'blue',
  },
  {
    id: 3,
    name: '야간',
    time: '근무 오전 1:00~오전 8:00',
    color: 'green',
  },
]

const DrawerContent1 = () => {
  return (
    <>
      <div className="mt-12">
        <div className="drawer-label mb-[15px]">탬플릿</div>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((i) => (
            <div key={i.id} className="rounded-lg border border-gray-border px-5 py-6">
              <div className="flex items-center justify-between">
                <Bullet bulletColor={i.color}>
                  <span className="text-lg font-semibold tracking-custom text-[#33333E]">
                    {i.name}
                  </span>
                </Bullet>
                <EllipsisVerticalIcon className="size-4" />
              </div>
              <div className="mt-5 text-[15px] tracking-custom text-placeholder">{i.time}</div>
            </div>
          ))}
          <div className="flex items-center justify-center rounded-lg bg-[#F5F5F5] text-lg font-semibold tracking-custom text-placeholder">
            <PlusIcon className="mr-1 size-3" /> 추가하기
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="drawer-label mb-[15px]">직접 입력</div>
        <div className="flex h-32 items-center justify-center rounded-lg bg-[#F5F5F5] text-lg font-semibold tracking-custom text-placeholder">
          <PlusIcon className="mr-1 size-3" /> 스케줄 생성하기
        </div>
      </div>
    </>
  )
}

export default DrawerContent1
