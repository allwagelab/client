import type { ReactNode } from 'react'

const TitleValue = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <div className="flex items-center gap-6">
      <span className="w-20 break-words text-placeholder">{title}</span>
      <span className="flex w-[333px] break-words font-medium tracking-custom text-gray-label">
        {children}
      </span>
    </div>
  )
}

export default TitleValue
