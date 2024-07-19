"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useGameStore } from "../../../stores/useGameStore"
import clsx from "clsx"
import Modal from "@/components/Modal"
import ModalTryAgainIcon from "@/icons/modal-try-again.svg"
import PlayerXIcon from "@/icons/player-x.svg"
import PlayerOIcon from "@/icons/player-o.svg"

type Cell = "X" | "O" | null

interface BoardProps {
  mode: "bot" | "pvp"
}

const Board: React.FC<BoardProps> = ({ mode }) => {
  const router = useRouter()

  const [ board, setBoard ] = useState<Cell[]>(Array(9).fill(null))
  const [ playerMoves, setPlayerMoves ] = useState<number[]>([])
  const [ botMoves, setBotMoves ] = useState<number[]>([])
  const [ isXNext, setIsXNext ] = useState(true)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ winner, setWinner ] = useState<string | null>(null)

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
    const winner = calculateWinner(newBoard)
    if (winner) {
      setWinner(winner === "X" ? player1Name : player2Name)
      setIsModalOpen(true)
    }
  }

  const botMove = (currentBoard: Cell[]) => {
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

    const winner = calculateWinner(newBoard)
    if (winner) {
      setWinner(winner === "X" ? player1Name : "Bot")
      setIsModalOpen(true)
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

  const calculateWinner = (board: Cell[]) => {
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
        return board[a]
      }
    }
    return null
  }

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
        {board.map((cell, index) => (
          <div
            key={index}
            className={clsx(
              "flex size-[12vh] items-center justify-center rounded-[14px] border-2 border-primary-950 shadow-bo lg:size-[120px]",
              cell === "X" ? "cursor-default bg-primary-600" :
                cell === "O" ? "cursor-default bg-primary-600" :
                  "cursor-pointer bg-primary-400"
            )}
            onClick={() => handleClick(index)}
          >
            {cell === "X"
              ? <PlayerXIcon className="size-9" />
              : cell === "O"
                ? <PlayerOIcon className="size-10" />
                : null
            }
          </div>
        ))}
      </div>
      <Modal
        title="Game Over"
        description={`Congratulations ${winner}! You have won the game with outstanding performance.`}
        icon={<ModalTryAgainIcon className="size-24 lg:size-[120px]" />}
        btnText="Go home"
        isOpen={isModalOpen}
        onClose={() => router.push("/")}
      />
    </div>
  )
}

export default Board