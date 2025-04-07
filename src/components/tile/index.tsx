import React, { memo } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { TileType } from '../../types/gameTypes'
import { styles } from './styles'

// Props do componente Tile
interface TileProps {
    tile: TileType;
    onPress: () => void;
    size: number;
}

// Mapeamento de tipos de tile para imagens
const tileImages = {
    red: require('../../assets/images/red-gem.png'),
    blue: require('../../assets/images/blue-gem.png'),
    green: require('../../assets/images/green-gem.png'),
    yellow: require('../../assets/images/yellow-gem.png'),
    purple: require('../../assets/images/purple-gem.png'),
    special: require('../../assets/images/special-gem.png'),
};

export const Tile: React.FC<TileProps> = ({ tile, onPress, size }) => {
  // Valores animados
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

  // Estilo animado
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

  // Efeito para animação quando o tile é combinado
    React.useEffect(() => {
        if (tile.matched) {
        scale.value = withSequence(
            withSpring(1.2),
            withTiming(0, { duration: 300 })
        );
        opacity.value = withTiming(0, { duration: 300 });
        }
    }, [tile.matched]);

    return (
        <Animated.View style={[styles.container, animatedStyle, { width: size, height: size }]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Image 
            source={tileImages[tile.type]} 
            style={styles.image} 
            resizeMode="contain"
            />
        </TouchableOpacity>
        </Animated.View>
    );
};

// Memoize para melhor performance
export default memo(Tile);