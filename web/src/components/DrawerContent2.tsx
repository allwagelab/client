import { useState } from 'react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import ColorDropdown from './ColorDropdown'
import Bullet from './Bullet'

const DrawerContent2 = () => {
  const [text, setText] = useState('')
  const maxLength = 500

  return (
    <>
      <div className="mt-12">
        <Bullet bulletColor="red" className="mb-[15px]">
          <span className="text-lg font-semibold tracking-custom text-gray-label">
            스케줄 근무 이름
          </span>
        </Bullet>
        <div className="mt-4 flex gap-2">
          <ColorDropdown />
          <input className="drawer-input w-full" placeholder="Ex) 오픈, 미들, 마감" />
        </div>
      </div>
      <div className="mt-11">
        <Bullet bulletColor="red" className="mb-[15px]">
          <span className="text-lg font-semibold tracking-custom text-gray-label">
            스케줄 근무 이름
          </span>
        </Bullet>
        <div className="mt-4 flex items-center gap-2">
          <input className="drawer-input w-full" placeholder="오전 10:00" />
          <div className="text-3xl">~</div>
          <input className="drawer-input w-full" placeholder="오후 2:00" />
          <div className="blue-label">총 4시간</div>
        </div>
      </div>
      <div className="mt-11">
        <Bullet bulletColor="red" className="mb-[15px]">
          <span className="text-lg font-semibold tracking-custom text-gray-label">휴게 시간</span>
        </Bullet>
        <div className="mt-4 flex flex-col gap-2">
          <input className="drawer-input w-32" placeholder="60분" />
          <div className="text-[13px] text-[#457DFF]">
            * 4시간 근무 당 휴게시간 30분을 의무적으로 부여해야 합니다.
          </div>
        </div>
      </div>
      <div className="mt-11">
        <Bullet bulletColor="red" className="mb-[15px]">
          <span className="mr-[11px] text-lg font-semibold tracking-custom text-gray-label">
            필수 근로 인원
          </span>
          <div className="group relative text-blue">
            <QuestionMarkCircleIcon className="size-5" />
            <div className="absolute bottom-full left-1/2 mb-2 hidden w-auto -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-700 px-2 py-1 text-xs text-white group-hover:block">
              Tooltip :)
            </div>
          </div>
        </Bullet>
        <div className="mt-4 flex flex-col gap-2">
          <input className="drawer-input w-32" placeholder="0명" />
        </div>
      </div>
      <div className="my-11">
        <Bullet bulletColor="red" className="mb-[15px]">
          <span className="text-lg font-semibold tracking-custom text-gray-label">
            설명 또는 메모
          </span>
        </Bullet>

        <div className="relative mt-4 w-full">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            maxLength={maxLength}
            className="custom-scrollbar h-36 w-full resize-none overflow-y-auto rounded-md border border-gray-border px-4 pb-12 pt-4 tracking-custom placeholder:text-placeholder"
            placeholder="내용을 입력해주세요"
          />

          <div
            className={`absolute bottom-6 right-4 text-sm ${
              text.length > maxLength ? 'text-red' : 'text-placeholder'
            }`}
          >
            {text.length}/{maxLength}
          </div>
        </div>
      </div>
    </>
  )
}

export default DrawerContent2
