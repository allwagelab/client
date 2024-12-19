import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

export type Option = {
  color: string
  name: string
}

interface SelectBoxProps {
  options: Option[]
}

const SelectBox = ({ options }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(options[0])

  const selectOption = (option: Option) => {
    setSelected(option)
    setIsOpen(false)
  }

  return (
    <div className="w-80">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-gray-border bg-white px-4 py-3 text-left text-sm text-gray-700 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-3 text-lg leading-5 tracking-custom text-placeholder">
          <span className={`size-3 rounded-full ${selected.color}`} />
          {selected.name}
        </span>
        <ChevronDownIcon className="size-5" />
      </button>

      {isOpen && (
        <ul className="absolute my-1 max-h-60 w-80 overflow-auto rounded-md bg-white text-sm ring-1 ring-black ring-opacity-5">
          {options.map((i) => (
            <li
              key={i.name}
              className="relative flex cursor-pointer select-none items-center p-4 pr-9 hover:bg-gray-100"
              onClick={() => selectOption(i)}
              onKeyDown={() => {}}
            >
              <span className={`size-3 rounded-full ${i.color} mr-3`} />
              <span className="text-lg leading-5 tracking-custom text-placeholder">{i.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectBox
