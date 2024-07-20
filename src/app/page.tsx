import { cookies } from "next/headers"
import Home from "./home/page"
import LanguageSwitcher from "./home/components/LanguageSwitcher"

export default function Page() {
  const cookieStore = cookies()
  const lang = cookieStore.get("locale")?.value || "en"

  return <>
    <LanguageSwitcher initialLang={lang} />
    <Home />
  </>
}