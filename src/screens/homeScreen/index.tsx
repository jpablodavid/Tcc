import React, { useEffect } from 'react'
import { router} from "expo-router"
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { loadSounds, playSound } from '@/utils/audioManager'
import { styles } from "./styles"


export const HomeScreen = () => {

    // Carrega os sons quando a tela é montada
    useEffect(() => {
        loadSounds();
        playSound('background', 0.5)
    }, []);

    const handlePlayPress = () => {
        playSound('click')
        router.navigate("./gameScreen")
    };

    return (
        <View style={styles.container}>
        {/* Logo do jogo */}
        <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
        />
        
        {/* Botão de jogar */}
        <TouchableOpacity style={styles.button} onPress={handlePlayPress}>
            <Text style={styles.buttonText}>JOGAR</Text>
        </TouchableOpacity>
        
        {/* Rodapé */}
        <Text style={styles.footer}>Royal Match Clone</Text>
        </View>
    );
};
