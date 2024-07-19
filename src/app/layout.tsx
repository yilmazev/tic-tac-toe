import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "../styles/globals.css"

const nunito = Nunito({ subsets: [ "latin" ] })

export const metadata: Metadata = {
  title: "Infinite Tic Tac Toe",
  description: "Challenge yourself or a friend in our Ultimate XOX Game! Play against a smart bot or compete with another player in a classic game of Tic-Tac-Toe. Enjoy an intuitive and responsive design with a seamless gaming experience. Start playing now and test your strategy skills!"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  )
}