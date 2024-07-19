import clsx from "clsx"
import React from "react"

interface ButtonProps {
  variant?: "primary" | "stone" | "shamrock" | "cinnabar" | "discord"
  isFull?: boolean
  isLoading?: boolean
  isDisabled?: boolean
  buttonColor?: string
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isFull = true,
  isLoading = false,
  isDisabled,
  className,
  onClick,
  children
}) => {
  const variantClasses = {
    primary: "bg-primary-300 hover:bg-primary-400",
    stone: "bg-stone-300 hover:bg-stone-400",
    shamrock: "bg-shamrock-300 hover:bg-shamrock-400",
    cinnabar: "bg-cinnabar-300 hover:bg-cinnabar-400",
    discord: "bg-brand-discord text-white"
  }

  return (
    <button
      className={clsx(
        "flex w-full items-center justify-center gap-2 rounded-[14px] border-2 border-primary-950 px-5 py-2 text-base text-primary-950 shadow-sh active:translate-y-[6px] active:shadow-none lg:w-fit",
        variantClasses[variant],
        className,
        { "!w-full !px-0": isFull }
      )}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button