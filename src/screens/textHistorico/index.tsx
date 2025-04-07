import React, { useEffect } from 'react'
import { router} from "expo-router"
import { View, Text, TouchableOpacity } from 'react-native'
import { loadSounds, playSound } from '@/utils/audioManager'
import { styles } from './styles'


const TextHistorico = () => {

    // Carrega os sons quando a tela é montada
    useEffect(() => {
        loadSounds();
        playSound('history', 0.5)
    }, []);

    const handleNextPress = () => {
        playSound('click')
        router.navigate("./gameScreen")
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>No periodo ainda anterior a chegada dos europes, era comum transformar os prisioneiros das guerras entre as tribos africanas, em escravos. Com a chegada dos europeus os conflitos aumentaram, agora os escravos eram um produto muito valioso para o comercio mundial. Os Negros da Africa perderam sua liberdade, mas não sua cultura e religião, que se mantem no brasil até hoje. principalmente a IORUBÁ</Text>
            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

        </View>
    );
};

export default TextHistorico
