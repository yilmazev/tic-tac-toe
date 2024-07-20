"use client"

import { useState } from "react"
import { setLanguage } from "@/actions/actions"
import Select from "../../../components/Select"
import { useTranslations } from "next-intl"

interface LanguageSwitcherProps {
  initialLang: string;
}

export default function LanguageSwitcher({ initialLang }: LanguageSwitcherProps) {
  const t = useTranslations()
  const [ lang, setLang ] = useState(initialLang)

  const handleChangeLocale = async (newLang: string) => {
    if (newLang !== lang) {
      await setLanguage(newLang)
      setLang(newLang)
    }
  }

  return (
    <div className="mb:mb-0 left-2 top-2 mb-8 w-fit md:absolute">
      <Select
        value={lang}
        onChange={handleChangeLocale}
        options={[
          { value: "en", label: t("language.en") },
          { value: "tr", label: t("language.tr") }
        ]}
      />
    </div>
  )
}