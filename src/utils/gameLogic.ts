import _  from 'lodash'
import { TileType, GameState, Level } from '../types/gameTypes'

// Níveis do jogo
export const levels: Level[] = [
    {
        id: 1,
        name: 'Nível Fácil',
        targetScore: 100,
        maxMoves: 25,
        boardSize: { rows: 6, cols: 6 },
        unlocked: true,
    },
    {
        id: 2,
        name: 'Nível Médio',
        targetScore: 200,
        maxMoves: 20,
        boardSize: { rows: 7, cols: 7 },
        unlocked: false,
    },
    // Adicione mais níveis...
    ]

// Tipos de tiles disponíveis
const tileTypes: Array<TileType['type']> = ['red', 'blue', 'green', 'yellow', 'purple']

/**
 * Cria um novo tabuleiro com peças aleatórias
 * @param rows Número de linhas
 * @param cols Número de colunas
 * @returns Matriz de tiles
 */
export const createBoard = (rows: number, cols: number): TileType[][] => {
    const board: TileType[][] = [];
    
    for (let row = 0; row < rows; row++) {
        const currentRow: TileType[] = []
        for (let col = 0; col < cols; col++) {
            // Garante que não há combinações iniciais
            let type: TileType['type']
            let attempts = 0;
            
            do {
                type = _.sample(tileTypes)!
                attempts++;
                
                // Previne loop infinito
                if (attempts > 10) {
                    type = 'red'; // Fallback
                    break
                }
                
                // Verifica combinações horizontais
                if (col >= 2) {
                    if (currentRow[col - 1].type === type && currentRow[col - 2].type === type) {
                        continue
                    }
                }
                
                // Verifica combinações verticais
                if (row >= 2) {
                    if (board[row - 1][col].type === type && board[row - 2][col].type === type) {
                        continue
                    }
                }
                
                break
            } while (true)
            
            currentRow.push({
                id: `${row}-${col}`,
                type,
                row,
                col,
                matched: false,
            })
        }
        board.push(currentRow);
    }
    
    return board
};

/**
 * Verifica se dois tiles são adjacentes
 * @param tile1 Primeiro tile
 * @param tile2 Segundo tile
 * @returns True se são adjacentes
 */
export const areTilesAdjacent = (tile1: TileType, tile2: TileType): boolean => {
    const rowDiff = Math.abs(tile1.row - tile2.row)
    const colDiff = Math.abs(tile1.col - tile2.col)
    
    // Adjacente se a diferença for 1 em linha ou coluna (não ambos)
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};

/**
 * Troca dois tiles no tabuleiro
 * @param board Tabuleiro atual
 * @param tile1 Primeiro tile
 * @param tile2 Segundo tile
 * @returns Novo tabuleiro com os tiles trocados
 */
export const swapTiles = (board: TileType[][], tile1: TileType, tile2: TileType): TileType[][] => {
    const newBoard = _.cloneDeep(board)
    
    // Encontra os tiles no novo tabuleiro
    const t1 = newBoard[tile1.row][tile1.col]
    const t2 = newBoard[tile2.row][tile2.col]
    
    // Troca os tipos
    const tempType = t1.type
    t1.type = t2.type
    t2.type = tempType
    
    return newBoard
};

/**
 * Encontra e marca todas as combinações no tabuleiro
 * @param board Tabuleiro para verificar
 * @returns Objeto com o novo tabuleiro e pontuação das combinações
 */
export const findMatches = (board: TileType[][]): { newBoard: TileType[][], score: number } => {
    const newBoard = _.cloneDeep(board)
    let score = 0;
    
    // Marca todos os tiles como não combinados primeiro
    newBoard.forEach((row: TileType[]) => {
        row.forEach((tile: TileType) => {
            tile.matched = false;
        });
    });
    
    // Verifica combinações horizontais
    for (let row = 0; row < newBoard.length; row++) {
        for (let col = 0; col < newBoard[row].length - 2; col++) {
        const tile1 = newBoard[row][col]
        const tile2 = newBoard[row][col + 1]
        const tile3 = newBoard[row][col + 2]
        
        if (tile1.type === tile2.type && tile2.type === tile3.type) {
            tile1.matched = true
            tile2.matched = true
            tile3.matched = true
            
            // Verifica se há mais tiles iguais na sequência
            for (let c = col + 3; c < newBoard[row].length; c++) {
                if (newBoard[row][c].type === tile1.type) {
                    newBoard[row][c].matched = true
                } else {
                    break
                }
            }
        }
        }
    }
    
    // Verifica combinações verticais
    for (let col = 0; col < newBoard[0].length; col++) {
        for (let row = 0; row < newBoard.length - 2; row++) {
            const tile1 = newBoard[row][col]
            const tile2 = newBoard[row + 1][col]
            const tile3 = newBoard[row + 2][col]
            
            if (tile1.type === tile2.type && tile2.type === tile3.type) {
                tile1.matched = true
                tile2.matched = true
                tile3.matched = true
                
                // Verifica se há mais tiles iguais na sequência
                for (let r = row + 3; r < newBoard.length; r++) {
                    if (newBoard[r][col].type === tile1.type) {
                        newBoard[r][col].matched = true
                    } else {
                        break
                    }
                }
            }
        }
    }
    
    // Calcula a pontuação
    newBoard.forEach((row: TileType[]) => row.forEach((tile: TileType) => {
        if (tile.matched) {
        score += 10; // 10 pontos por tile combinado
        }
    }))
    
    return { newBoard, score }
};

/**
 * Remove os tiles marcados e preenche com novos tiles
 * @param board Tabuleiro atual
 * @returns Novo tabuleiro com os tiles removidos e reposicionados
 */
export const removeMatchedTiles = (board: TileType[][]): TileType[][] => {
    const newBoard = _.cloneDeep(board)
    const cols = newBoard[0].length
    
    // Para cada coluna, remove os tiles combinados e faz os de cima caírem
    for (let col = 0; col < cols; col++) {
        const columnTiles = newBoard.map((row: TileType[]) => row[col])
        const remainingTiles = columnTiles.filter((tile : TileType) => tile.matched)
        const newTilesCount = columnTiles.length - remainingTiles.length
        
        // Cria novos tiles no topo
        const newTiles: TileType[] = []
        for (let i = 0; i < newTilesCount; i++) {
        newTiles.push({
            id: `new-${i}-${col}`,
            type: _.sample(tileTypes)!,
            row: -1, // Será atualizado abaixo
            col,
            matched: false,
        });
        }
        
        // Combina os tiles restantes com os novos
        const allTiles = [...newTiles, ...remainingTiles]
        
        // Atualiza as linhas
        for (let row = 0; row < newBoard.length; row++) {
        const tile = allTiles[row];
        tile.row = row;
        newBoard[row][col] = tile;
        }
    }
    
    return newBoard;
};

/**
 * Verifica se o jogo terminou (vitória ou derrota)
 * @param gameState Estado atual do jogo
 * @returns Objeto indicando se o jogo terminou e se foi vitória
 */
export const checkGameOver = (gameState: GameState): { isGameOver: boolean, isGameWon: boolean } => {
    const { score, movesLeft, currentLevel } = gameState
    const level = levels.find(l => l.id === currentLevel)
    
    if (!level) return { isGameOver: false, isGameWon: false }
    
    const isGameWon = score >= level.targetScore
    const isGameLost = movesLeft <= 0 && !isGameWon
    
    return {
        isGameOver: isGameWon || isGameLost,
        isGameWon,
    };
};