// Tipo para uma peça do tabuleiro
export type TileType = {
    id: string
    type: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'special'
    row: number
    col: number
    matched?: boolean
};

  // Tipo para o estado do jogo
export interface GameState {
    board: TileType[][]
    score: number
    movesLeft: number
    currentLevel: number
    isGameOver: boolean
    isGameWon: boolean
}

  // Tipo para um nível do jogo
export interface Level {
    id: number
    name: string
    targetScore: number
    maxMoves: number
    boardSize: {
        rows: number
        cols: number
    };
    unlocked: boolean
}