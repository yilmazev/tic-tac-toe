import { cookies } from "next/headers"
import Home from "./home/page"

export default function Page() {
  const cookieStore = cookies()
  const lang = cookieStore.get("locale")?.value || "en"

  return (
    <Home lang={lang} />
  )
}