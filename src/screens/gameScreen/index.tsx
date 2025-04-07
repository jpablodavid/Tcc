import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import GameBoard from '@/components/gameBoard'
import { GameState, Level, TileType } from '@/types/gameTypes'
import { levels } from '@/utils/gameLogic'
import { createBoard, findMatches, removeMatchedTiles, checkGameOver, areTilesAdjacent, swapTiles } from '@/utils/gameLogic'
import { playSound, setMuted } from '@/utils/audioManager'
import { styles } from "./styles"


export const GameScreen = () => {
    
    
    const { levelId } = useLocalSearchParams()

    // Encontra o nível selecionado
    const level = levels.find((l: Level) => l.id === Number(levelId));
    
    if (!level) {
        throw new Error(`Nível com ID ${levelId} não encontrado`)
    }

    // Estado do jogo
    const [gameState, setGameState] = useState<GameState>({
        board: createBoard(level.boardSize.rows, level.boardSize.cols),
        score: 0,
        movesLeft: level.maxMoves,
        currentLevel: Number(levelId),
        isGameOver: false,
        isGameWon: false,
    }); 
    
    const [selectedTile, setSelectedTile] = useState<TileType | null>(null)
    const [isMuted, setIsMuted] = useState(false)

    // Verifica se o jogo terminou
    useEffect(() => {
        const { isGameOver, isGameWon } = checkGameOver(gameState)
        
        if (isGameOver) {
        setGameState(prev => ({ ...prev, isGameOver, isGameWon }))
        
            if (isGameWon) {
                playSound('win');
                Alert.alert(
                'Parabéns!', 
                `Você completou o nível com ${gameState.score} pontos!`,
                [{ text: 'OK', onPress: () => router.back() }]
                )
            } else {
                playSound('lose')
                Alert.alert(
                'Fim de Jogo', 
                'Você não atingiu a pontuação necessária.',
                [{ text: 'OK', onPress: () => router.back() }]
                )
            }
        }
    }, [gameState.score, gameState.movesLeft])

  // Lógica para lidar com o pressionar de um tile
    const handleTilePress = useCallback((tile: TileType) => {
        // Se o jogo terminou, não faz nada
        if (gameState.isGameOver) return
        
        playSound('click')
        
        // Se nenhum tile está selecionado, seleciona este
        if (!selectedTile) {
            setSelectedTile(tile)
            return
        }
        
        // Se o mesmo tile foi clicado duas vezes, desseleciona
        if (selectedTile.id === tile.id) {
            setSelectedTile(null);
            return;
        }
        
        // Verifica se os tiles são adjacentes
        if (!areTilesAdjacent(selectedTile, tile)) {
            setSelectedTile(tile)
            return
        }
        
        // Troca os tiles
        const newBoard = swapTiles(gameState.board, selectedTile, tile);
        
        // Verifica combinações após a troca
        const { newBoard: matchedBoard, score: matchScore } = findMatches(newBoard);
        
        // Se não houve combinação, desfaz a troca
        if (matchScore === 0) {
            setGameState(prev => ({
                ...prev,
                board: swapTiles(newBoard, tile, selectedTile), // Desfaz a troca
                movesLeft: prev.movesLeft - 1,
            }))
        } else {
        // Atualiza o estado com a pontuação
            setGameState(prev => ({
                ...prev,
                board: matchedBoard,
                score: prev.score + matchScore,
                movesLeft: prev.movesLeft - 1,
            }))
        
            playSound('match')
            
            // Remove os tiles combinados e preenche com novos
            setTimeout(() => {
                setGameState(prev => {
                    const updatedBoard = removeMatchedTiles(prev.board);
                    const { newBoard: newMatchedBoard, score: newMatchScore } = findMatches(updatedBoard);
                    
                    // Verifica se há novas combinações após o preenchimento (combos)
                    if (newMatchScore > 0) {
                        playSound('match');
                        return {
                        ...prev,
                        board: newMatchedBoard,
                        score: prev.score + newMatchScore,
                        };
                    }
                    
                    return {
                            ...prev,
                            board: updatedBoard,
                    }
                })
            }, 500)
        }
        
        setSelectedTile(null)
    }, [gameState, selectedTile])

    // Alternar mute
    const toggleMute = () => {
        setIsMuted(prev => {
            setMuted(!prev)
            return !prev
        })
    }

    return (
        <View style={styles.container}>
        {/* Painel de informações */}
        <View style={styles.infoPanel}>
            <Text style={styles.score}>Pontos: {gameState.score}</Text>
            <Text style={styles.moves}>Movimentos: {gameState.movesLeft}</Text>
            <Text style={styles.target}>Objetivo: {level.targetScore}</Text>
            
            <TouchableOpacity onPress={toggleMute} style={styles.muteButton}>
            <Image 
                source={isMuted 
                ? require('../assets/images/mute.png') 
                : require('../assets/images/unmute.png')} 
                style={styles.muteIcon}
            />
            </TouchableOpacity>
        </View>
        
        {/* Tabuleiro do jogo */}
        <GameBoard 
            tiles={gameState.board} 
            onTilePress={handleTilePress}
        />
        </View>
    )
}
