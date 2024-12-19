import type { ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Drawer {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  children: ReactNode
}

const Drawer = ({ open, setOpen, title, children }: Drawer) => {
  return (
    <div className="h-full w-full" onClick={() => setOpen(!open)} onKeyDown={() => {}}>
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-all duration-500 ease-in-out ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />

      <div
        className={`fixed inset-y-0 right-0 w-2/5 min-w-96 transform overflow-hidden transition-transform duration-500 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={() => {}}
      >
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center justify-between px-10 pt-14">
            <div className="text-3xl font-semibold tracking-custom">{title}</div>
            <button
              type="button"
              className="text-gray-400 transition-colors hover:text-gray-600"
              onClick={() => setOpen(!open)}
              onKeyDown={() => {}}
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <div className="custom-scrollbar overflow-y-auto px-10">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Drawer
