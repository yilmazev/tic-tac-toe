import { cookies } from "next/headers"
import Home from "./home/page"

const Page: React.FC = () => {
  const cookieStore = cookies()
  const lang = cookieStore.get("locale")?.value || "en"

  return (
    <Home lang={lang} />
  )
}

export default Page