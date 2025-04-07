import React from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { styles } from "./styles"

const ConfigScreen = () => {
    return (
        <View style={styles.container}>
            <Text>configurar</Text>
        </View>
    )
}

export default ConfigScreen
