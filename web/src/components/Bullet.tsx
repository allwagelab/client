import type { ReactNode } from 'react'

export type Colors = 'red' | 'blue' | 'green'

interface BulletProp {
  bulletColor: Colors
  className?: string
  children: ReactNode
}

const colors: { [key in Colors]: string } = {
  red: 'bg-red',
  blue: 'bg-blue',
  green: 'bg-green',
}

const Bullet = ({ bulletColor, className, children }: BulletProp) => {
  return (
    <div className={`flex items-center ${className ?? ''}`}>
      <div className={`mr-[9px] size-2 rounded-full ${colors[bulletColor]}`} />
      {children}
    </div>
  )
}

export default Bullet
