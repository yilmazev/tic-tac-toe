import create from "zustand"

interface GameState {
  mode: "bot" | "pvp" | null;
  player1Name: string;
  player2Name: string;
  setMode: (mode: "bot" | "pvp" | null) => void;
  setPlayerNames: (player1: string, player2: string) => void;
  loadPlayerNames: () => void;
  updatePlayer1Name: (name: string) => void;
  updatePlayer2Name: (name: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  mode: null,
  player1Name: "Player 1",
  player2Name: "Player 2",
  setMode: (mode) => set({ mode }),
  setPlayerNames: (player1, player2) => {
    localStorage.setItem("player1Name", player1)
    localStorage.setItem("player2Name", player2)
    set({ player1Name: player1, player2Name: player2 })
  },
  loadPlayerNames: () => {
    const player1 = localStorage.getItem("player1Name") || "Player 1"
    const player2 = localStorage.getItem("player2Name") || "Player 2"
    set({ player1Name: player1, player2Name: player2 })
  },
  updatePlayer1Name: (name) => set({ player1Name: name }),
  updatePlayer2Name: (name) => set({ player2Name: name })
}))
