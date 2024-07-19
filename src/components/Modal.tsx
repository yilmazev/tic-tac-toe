import React from "react"
import clsx from "clsx"
import Button from "./Button"

interface ModalProps {
  title: string
  description: string
  icon: React.ReactNode
  btnText: string,
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ title, description, icon, btnText, isOpen, onClose }) => {
  return (
    <div className={clsx("fixed inset-0 z-10 flex items-center justify-center bg-primary-950/70 px-4 transition-opacity", { "opacity-0 pointer-events-none": !isOpen, "opacity-100 pointer-events-auto": isOpen })}>
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-3xl bg-primary-100 p-6 lg:p-12">
        <div className="mb-6 lg:mb-9">
          {icon}
        </div>
        <div className="mb-6 lg:mb-9">
          <h2 className="mb-1 text-center text-2xl text-primary-900 lg:text-4xl">{title}</h2>
          <p className="text-center text-sm text-primary-800 lg:text-base">{description}</p>
        </div>
        <Button isFull={false} onClick={onClose}>{btnText}</Button>
      </div>
    </div>
  )
}

export default Modal