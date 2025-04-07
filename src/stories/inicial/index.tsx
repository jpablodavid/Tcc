import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

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
  // Adicione mais stories
];


export default function StoriesScreen() {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Stories</Text>
            
            <FlatList
                data={stories}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                <Link href={{
                    pathname: "./stories/inicial/[id]",
                    params: { 
                        id: item.id, 
                        index: index 
                    }
                }} asChild>
                    <TouchableOpacity style={{ marginRight: 15 }}>
                        <Image 
                            source={item.image} 
                            style={{ width: 100, height: 150, borderRadius: 10 }} 
                        />
                        <Text style={{ textAlign: 'center', marginTop: 5 }}>{item.title}</Text>
                    </TouchableOpacity>
                </Link>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}