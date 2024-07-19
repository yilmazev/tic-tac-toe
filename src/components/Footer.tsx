import Link from "next/link"
import React from "react"

const Footer: React.FC = () => {
  return (
    <div className="absolute bottom-2">
      <p className="flex flex-col text-center text-sm text-primary-200 lg:text-base">
        <span>Design system by <Link href="https://bilgecodel.art" target="_blank" rel="noreferrer" className="text-white">Bilge Cödel</Link></span>
        <span>Development by <Link href="https://yilmazev.dev" target="_blank" rel="noreferrer" className="text-white">Yılmaz Ev</Link></span>
      </p>
    </div>
  )
}

export default Footer