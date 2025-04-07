import React, { useEffect } from 'react'
import { router } from "expo-router"
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { loadSounds, playSound } from '@/utils/audioManager'
import { styles } from "./styles"


const HomeScreen = () => {

    // Carrega os sons quando a tela é montada
    useEffect(() => {
        loadSounds()
        playSound('background', 0.5)
    }, []);

    const handlePlayPress = () => {
        playSound('click')
        router.navigate("./test")
    };

    return (
        <View style={styles.container}>
        {/* Logo do jogo */}
            <ImageBackground 
                source={require('@/assets/images/background.png')} 
                style={styles.background} 
                resizeMode="contain"
            >
                {/* Botão de jogar */}
                <TouchableOpacity 
                style={styles.button}
                activeOpacity={0.5} 
                onPress={handlePlayPress}>
                    <Text style={styles.buttonText}>JOGAR</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default HomeScreen
