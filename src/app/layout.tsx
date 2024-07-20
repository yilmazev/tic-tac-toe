import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "../styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

const nunito = Nunito({ subsets: [ "latin" ] })

export const metadata: Metadata = {
  title: "Infinite Tic Tac Toe",
  description: "Challenge yourself or a friend in our Ultimate XOX Game! Play against a smart bot or compete with another player in a classic game of Tic-Tac-Toe. Enjoy an intuitive and responsive design with a seamless gaming experience. Start playing now and test your strategy skills!"
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={nunito.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}