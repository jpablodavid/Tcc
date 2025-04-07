import { useLocalSearchParams } from 'expo-router'
import StoryView from '@/stories/inicial/components/StoryView'

const stories = [
    {
        id: '1',
        image: require('./assets/story1.jpg'),
        title: 'Story 1',
    },
    {
        id: '2',
        image: require('./assets/story2.jpg'),
        title: 'Story 2',
    },
  // Mesma lista de stories
];

export default function StoryScreen() {
    
    const { id, index } = useLocalSearchParams()
    
    const initialIndex = typeof index === 'string' ? parseInt(index) : 0

    return (
        <StoryView 
        stories={stories} 
        currentIndex={initialIndex} 
        />
    );
}