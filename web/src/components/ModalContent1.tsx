import { PhoneIcon, UserIcon } from '@heroicons/react/16/solid'
import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import type { MouseEventHandler } from 'react'
import TitleValue from './TitleValue'
import Button from './Button'

const EditButton = ({
  label,
  className,
  onClick,
}: {
  label: string
  className?: string
  onClick?: MouseEventHandler
}) => {
  return (
    <span
      className={`flex cursor-pointer items-center gap-1 text-sm ${className}`}
      onClick={onClick}
      onKeyDown={() => {}}
    >
      <PencilIcon className="size-3" /> {label}
    </span>
  )
}

const ModalContent1 = () => {
  return (
    <div className="mt-10">
      <div className="flex border-b pb-9">
        <div className="mr-7 flex flex-col items-center">
          <UserCircleIcon className="size-20" />
          <EditButton label="변경" />
        </div>
        <div className="flex flex-col py-[5px]">
          <div className="mb-4">
            홍길동 <span className="blue-label ml-2">계약직</span>
          </div>
          <div className="mb-[10px] flex items-center tracking-custom text-gray-label">
            <UserIcon className="mr-1 size-4" />
            1997.12.26 (만 26세) | 남자
          </div>
          <div className="flex items-center tracking-custom text-gray-label">
            <PhoneIcon className="mr-1 size-4" /> 010-0000-5164
          </div>
        </div>
      </div>

      <div className="mb-12 mt-[52px] grid grid-cols-2 gap-4">
        <TitleValue title="주소">서울 도봉구 마들로13길 61 씨드큐브 창동</TitleValue>
        <TitleValue title="급여">
          시급 <span className="ml-1 text-blue">9,860원</span>
        </TitleValue>
        <TitleValue title="이메일">pledge1226@naver.com</TitleValue>
        <TitleValue title="보건증">등록</TitleValue>
        <TitleValue title="담당 업무">주방, 서빙, 손님응대</TitleValue>
        <TitleValue title="근로 계약서">
          - <EditButton className="ml-3" label="추가하기" />
        </TitleValue>
        <TitleValue title="입사일">
          2024.05.22 <EditButton className="ml-3" label="변경" />
        </TitleValue>
        <TitleValue title="근무 정보">
          주 25시간 근무
          <div className="absolute mt-7">
            월 12:00 ~ 18:00 (6시간)
            <br /> 화 12:00 ~ 등등
          </div>
        </TitleValue>
        <TitleValue title="퇴사일">
          - <EditButton className="ml-3" label="수정" />
        </TitleValue>
      </div>
      <div className="mt-9 grid grid-cols-2 gap-5">
        <Button label="취소" />
        <Button label="정보 추가" />
      </div>
    </div>
  )
}

export default ModalContent1
