import Image from "next/image"
import Link from "next/link"
import React from "react"

const Header: React.FC = () => {
  return (
    <Link href="/">
      <Image src="/images/logo.png" alt="Logo" width={877} height={202} className="mb-9 w-80" />
    </Link>
  )
}

export default Header