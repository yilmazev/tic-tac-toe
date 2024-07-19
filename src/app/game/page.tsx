"use client"

import React, { useEffect } from "react"
import Board from "./components/Board"
import { useGameStore } from "../../stores/useGameStore"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"

const Game: React.FC = () => {
  const router = useRouter()
  const { mode, loadPlayerNames } = useGameStore()

  useEffect(() => {
    if (mode === null) {
      router.push("/")
    }
  }, [ mode ])

  useEffect(() => {
    loadPlayerNames()
  }, [ loadPlayerNames ])

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10 lg:justify-center">
      {/* <Header /> */}
      {mode && <Board mode={mode} />}
      <Footer />
    </div>
  )
}

export default Game