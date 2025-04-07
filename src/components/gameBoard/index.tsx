import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TileType } from '@/types/gameTypes';
import Tile from '@/components/tile';

// Props do componente Board
interface BoardProps {
    tiles: TileType[][];
    onTilePress: (tile: TileType) => void;
}

const Board: React.FC<BoardProps> = ({ tiles, onTilePress }) => {
  // Calcular tamanho do tile baseado na largura da tela
    const screenWidth = Dimensions.get('window').width;
    const tileSize = (screenWidth - 20) / tiles[0].length - 4;

    return (
        <View style={styles.container}>
        {tiles.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((tile) => (
                <Tile
                key={tile.id}
                tile={tile}
                onPress={() => onTilePress(tile)}
                size={tileSize}
                />
            ))}
            </View>
        ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        margin: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default Board;