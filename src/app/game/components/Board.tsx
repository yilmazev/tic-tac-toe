"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useGameStore } from "../../../stores/useGameStore"
import clsx from "clsx"
import Modal from "@/components/Modal"
import ModalTryAgainIcon from "@/icons/modal-try-again.svg"
import PlayerXIcon from "@/icons/player-x.svg"
import PlayerOIcon from "@/icons/player-o.svg"
import { useTranslations } from "next-intl"

type Cell = "X" | "O" | null

interface BoardProps {
  mode: "bot" | "pvp"
}

const Board: React.FC<BoardProps> = ({ mode }) => {
  const t = useTranslations()
  const router = useRouter()

  const [ board, setBoard ] = useState<Cell[]>(Array(9).fill(null))
  const [ playerMoves, setPlayerMoves ] = useState<number[]>([])
  const [ botMoves, setBotMoves ] = useState<number[]>([])
  const [ isXNext, setIsXNext ] = useState(true)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ winner, setWinner ] = useState<string | null>(null)
  const [ winningCells, setWinningCells ] = useState<number[] | null>(null)

  const { player1Name, player2Name } = useGameStore()

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return

    const newBoard = board.slice()
    const newPlayerMoves = playerMoves.slice()
    const newBotMoves = botMoves.slice()

    if (mode === "bot") {
      if (isXNext) {
        if (playerMoves.length === 3) {
          const oldestMove = newPlayerMoves.shift()!
          newBoard[oldestMove] = null
        }
        newPlayerMoves.push(index)
        newBoard[index] = "X"
        setPlayerMoves(newPlayerMoves)
        setIsXNext(false)

        setTimeout(() => botMove(newBoard), 500)
      }
    } else {
      const currentPlayer = isXNext ? "X" : "O"
      if (currentPlayer === "X" && playerMoves.length === 3) {
        const oldestMove = newPlayerMoves.shift()!
        newBoard[oldestMove] = null
      }
      if (currentPlayer === "O" && botMoves.length === 3) {
        const oldestMove = newBotMoves.shift()!
        newBoard[oldestMove] = null
      }

      if (currentPlayer === "X") {
        newPlayerMoves.push(index)
        setPlayerMoves(newPlayerMoves)
      } else {
        newBotMoves.push(index)
        setBotMoves(newBotMoves)
      }

      newBoard[index] = currentPlayer
      setIsXNext(!isXNext)
    }

    setBoard(newBoard)
    const winningCells = calculateWinner(newBoard)
    if (winningCells) {
      if (mode === "bot") {
        setWinner(isXNext ? "X" : "Bot")
      } else {
        setWinner(isXNext ? player1Name : player2Name)
      }
      setWinningCells(winningCells)
      setTimeout(() => {
        setIsModalOpen(true)
      }, 1000)
    }
  }

  const botMove = (currentBoard: Cell[]) => {
    if (calculateWinner(currentBoard)) return

    const newBoard = currentBoard.slice()
    const newBotMoves = botMoves.slice()

    const winMove = findWinningMove(newBoard, "O")
    const blockMove = findWinningMove(newBoard, "X")

    let botMoveIndex

    if (winMove !== null) {
      botMoveIndex = winMove
    } else if (blockMove !== null) {
      botMoveIndex = blockMove
    } else {
      const emptyIndices = newBoard.map((cell, idx) => (cell === null ? idx : null)).filter(idx => idx !== null) as number[]
      botMoveIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
    }

    if (botMoves.length === 3) {
      const oldestMove = newBotMoves.shift()!
      newBoard[oldestMove] = null
    }

    newBotMoves.push(botMoveIndex)
    newBoard[botMoveIndex] = "O"
    setBoard(newBoard)
    setBotMoves(newBotMoves)
    setIsXNext(true)

    const winningCells = calculateWinner(newBoard)
    if (winningCells) {
      setWinner("Bot")
      setWinningCells(winningCells)
      setTimeout(() => {
        setIsModalOpen(true)
      }, 1000)
    }
  }

  const findWinningMove = (board: Cell[], player: "X" | "O"): number | null => {
    const lines = [
      [ 0, 1, 2 ],
      [ 3, 4, 5 ],
      [ 6, 7, 8 ],
      [ 0, 3, 6 ],
      [ 1, 4, 7 ],
      [ 2, 5, 8 ],
      [ 0, 4, 8 ],
      [ 2, 4, 6 ]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [ a, b, c ] = lines[i]
      if (board[a] === player && board[b] === player && board[c] === null) return c
      if (board[a] === player && board[b] === null && board[c] === player) return b
      if (board[a] === null && board[b] === player && board[c] === player) return a
    }
    return null
  }

  const calculateWinner = (board: Cell[]): number[] | null => {
    const lines = [
      [ 0, 1, 2 ],
      [ 3, 4, 5 ],
      [ 6, 7, 8 ],
      [ 0, 3, 6 ],
      [ 1, 4, 7 ],
      [ 2, 5, 8 ],
      [ 0, 4, 8 ],
      [ 2, 4, 6 ]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [ a, b, c ] = lines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return [ a, b, c ]
      }
    }
    return null
  }

  const getModalContent = (mode: "bot" | "pvp", winner: string | null) => {
    if (mode === "bot") {
      if (winner === "X") {
        return {
          title: t("game.modal.title.congratulations"),
          description: t("game.modal.desc.congratulations")
        }
      } else if (winner === "Bot") {
        return {
          title: t("game.modal.title.lose"),
          description: t("game.modal.desc.lose")
        }
      }
    } else if (mode === "pvp") {
      return {
        title: `${t("game.modal.title.congratulations")} ${winner}`,
        description: t("game.modal.desc.congratulations")
      }
    }
    return {
      title: t("game.modal.title.game_over"),
      description: t("game.modal.desc.game_over")
    }
  }

  const modalContent = getModalContent(mode, winner)

  const nextMoveIndex = playerMoves.length === 3 ? playerMoves[0] : null

  return (
    <div>
      {mode === "pvp" && (
        <div className="mb-4 flex justify-around">
          <div className={clsx("rounded-[14px] p-0.5 pb-2", isXNext ? "bg-white" : "")}>
            <div className={clsx("flex size-[110px] flex-col items-center justify-center gap-2 overflow-hidden rounded-[14px] border-2 border-primary-950 bg-primary-400 shadow-bo")}>
              <p className="truncate text-clip text-base">{player1Name}</p>
              <PlayerXIcon className="size-8" />
            </div>
          </div>
          <div className={clsx("rounded-[14px] p-0.5 pb-2", isXNext ? "" : "bg-white")}>
            <div className={clsx("flex size-[110px] flex-col items-center justify-center gap-2 overflow-hidden rounded-[14px] border-2 border-primary-950 bg-primary-400 shadow-bo")}>
              <p className="truncate text-clip text-base">{player2Name}</p>
              <PlayerOIcon className="size-9" />
            </div>
          </div>
        </div>
      )}
      <div className="grid w-fit grid-cols-3 gap-4 rounded-[14px] border-2 border-primary-950 bg-primary-700/70 p-5 shadow-bo">
        {board.map((cell, index) => {
          const isWinningCell = winningCells && winningCells.includes(index)
          const isNextMove = mode === "bot" && isXNext && cell === "X" && index === nextMoveIndex

          const outerClassName = clsx("rounded-[14px] p-0.5 pb-2", isWinningCell ? "" : isNextMove && "bg-white")

          const innerClassName = clsx(
            "flex size-[12vh] items-center justify-center rounded-[14px] border-2 border-primary-950 shadow-bo lg:size-[120px]",
            {
              "bg-shamrock-500": isWinningCell,
              "bg-primary-400": cell === "X" && index === nextMoveIndex,
              "cursor-default bg-primary-600": cell === "X" || cell === "O",
              "cursor-pointer bg-primary-400": !cell
            }
          )

          return (
            <div key={index} className={outerClassName}>
              <div className={innerClassName} onClick={() => handleClick(index)}>
                {cell === "X" && <PlayerXIcon className="size-9" />}
                {cell === "O" && <PlayerOIcon className="size-10" />}
              </div>
            </div>
          )
        })}
      </div>
      <Modal
        title={modalContent.title}
        description={modalContent.description}
        icon={<ModalTryAgainIcon className="size-24 lg:size-[120px]" />}
        btnText={t("game.modal.btn.go_home")}
        isOpen={isModalOpen}
        onClose={() => router.push("/")}
      />
    </div>
  )
}

export default Board