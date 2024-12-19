import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

type Color = { name: string; bgColor: string }

const colors: Color[] = [
  { name: 'red', bgColor: 'bg-red-500' },
  { name: 'blue', bgColor: 'bg-blue-500' },
  { name: 'green', bgColor: 'bg-green-500' },
  { name: 'yellow', bgColor: 'bg-yellow-500' },
  { name: 'purple', bgColor: 'bg-purple-500' },
]

const ColorDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<Color>(colors[0])

  const selectColor = (color: Color) => {
    setSelectedColor(color)
    setIsOpen(false)
  }

  return (
    <div className="w-20">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-gray-border bg-white px-4 py-4 text-left text-sm text-gray-700 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={() => {}}
      >
        <span className={`size-3 rounded-full ${selectedColor.bgColor}`} />

        <ChevronDownIcon className="size-5" />
      </button>

      {isOpen && (
        <ul className="absolute my-1 max-h-60 w-16 overflow-auto rounded-md bg-white text-sm ring-1 ring-black ring-opacity-5">
          {colors.map((color) => (
            <li
              key={color.name}
              className="relative flex cursor-pointer select-none items-center py-2 pl-3 pr-9 hover:bg-gray-100"
              onClick={() => selectColor(color)}
              onKeyDown={() => {}}
            >
              <span className={`size-3 rounded-full ${color.bgColor}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ColorDropdown
