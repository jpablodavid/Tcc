import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { router } from 'expo-router'
import { styles } from './styles'

interface Story {
    id: string
    image: any
    title: string
}

interface StoryViewProps {
    stories: Story[]
    currentIndex: number
}

const StoryView: React.FC<StoryViewProps> = ({ stories, currentIndex }) => {

    const [currentStoryIndex, setCurrentStoryIndex] = useState(currentIndex)

    const goToNextStory = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1)
        } else {
        router.back(); // ou navegar para outra tela
        }
    }

    const goToPreviousStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1)
        }
    }

    const currentStory = stories[currentStoryIndex]

    return (
        <View style={styles.container}>
            <Image source={currentStory.image} style={styles.image} />
            <Text style={styles.title}>{currentStory.title}</Text>
            
            <View style={styles.navigationContainer}>
                <TouchableOpacity 
                style={styles.navigationButton} 
                onPress={goToPreviousStory}
                activeOpacity={0.7}
                >
                    <View style={styles.leftButton} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                style={styles.navigationButton} 
                onPress={goToNextStory}
                activeOpacity={0.7}
                >
                    <View style={styles.rightButton} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default StoryView