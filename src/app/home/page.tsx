"use client"

import React, { useEffect, useState } from "react"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/stores/useGameStore"
import Input from "@/components/Input"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import LanguageSwitcher from "./components/LanguageSwitcher"
import { useTranslations } from "next-intl"

type HomeProps = {
  lang: string
}

export default function Home({ lang }: HomeProps) {
  const t = useTranslations()
  const router = useRouter()

  const { mode, setMode, setPlayerNames, loadPlayerNames, player1Name, player2Name, updatePlayer1Name, updatePlayer2Name } = useGameStore()
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(true)

  useEffect(() => {
    setMode(null)
  }, [])

  useEffect(() => {
    loadPlayerNames()
  }, [ loadPlayerNames ])

  useEffect(() => {
    setIsButtonDisabled(!player1Name.trim() || !player2Name.trim())
  }, [ player1Name, player2Name ])

  const handleModeSelect = (selectedMode: "bot" | "pvp") => {
    setMode(selectedMode)
    if (selectedMode === "bot") {
      router.push("/game")
    }
  }

  const handleStartGame = () => {
    if (!isButtonDisabled) {
      setPlayerNames(player1Name, player2Name)
      router.push("/game")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10 lg:justify-center">
      <LanguageSwitcher initialLang={lang} />
      <Header />
      <div className="w-full max-w-96">
        {mode === null
          ? <>
            <div className="flex flex-col gap-4">
              <Button onClick={() => handleModeSelect("bot")}>{t("home.single_player")}</Button>
              <Button variant="shamrock" onClick={() => handleModeSelect("pvp")}>{t("home.two_players")}</Button>
            </div>
          </>
          : mode === "pvp"
            ? <div className="flex flex-col gap-4">
              <Input
                value={player1Name}
                onChange={(e) => updatePlayer1Name(e.target.value)}
                placeholder={`${t("default.player")} 1`}
              />
              <Input
                value={player2Name}
                onChange={(e) => updatePlayer2Name(e.target.value)}
                placeholder={`${t("default.player")} 2`}
              />
              <Button variant={isButtonDisabled ? "stone" : "shamrock"} onClick={handleStartGame}>{t("home.start_game")}</Button>
            </div>
            : null
        }
      </div>
      <Footer />
    </div>
  )
}