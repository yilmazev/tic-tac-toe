import React, { useState, useEffect, useRef } from "react"
import clsx from "clsx"
import SolChevronDownIcon from "@/icons/sol-chevron-down.svg"

interface SelectProps {
  id?: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ id, value, className, onChange, options }) => {
  const [ isOpen, setIsOpen ] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ ref ])

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={clsx("relative", className)} ref={ref}>
      <div
        id={id}
        className="z-10 flex cursor-pointer select-none items-center gap-3 rounded-[14px] border-2 border-primary-400 bg-primary-400/30 p-4 text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(option => option.value === value)?.label}
        <SolChevronDownIcon className="size-6" />
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full divide-y-2 divide-primary-400 rounded-[14px] border-2 border-primary-400 bg-primary-400/30">
          {options.map(option => (
            <div
              key={option.value}
              className="cursor-pointer select-none p-4 text-sm hover:bg-primary-400/50"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select