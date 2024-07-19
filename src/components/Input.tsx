import clsx from "clsx"
import React from "react"

interface InputProps {
  type?: "text" | "email" | "number" | "password"
  placeholder?: string
  isFull?: boolean
  isDisabled?: boolean
  isError?: boolean
  className?: string
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  isFull = true,
  isDisabled,
  isError,
  className,
  startIcon,
  endIcon,
  value,
  onChange
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {startIcon && <div className="absolute left-3">{startIcon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={clsx(
            "h-full rounded-[14px] border-2 border-primary-400 bg-primary-400/30 p-3 text-base text-white placeholder:text-primary-300",
            { "!w-full": isFull },
            { "pl-9": startIcon },
            { "pr-9": endIcon },
            { "!border-cinnabar-400 !bg-cinnabar-400/30 placeholder:!text-cinnabar-300 focus:!border-cinnabar-950": isError },
            className
          )}
          disabled={isDisabled}
        />
        {endIcon && <div className="absolute right-3">{endIcon}</div>}
      </div>
    </div>
  )
}

export default Input