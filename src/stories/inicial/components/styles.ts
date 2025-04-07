import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        position: 'absolute',
        top: 50,
        left: 20,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    navigationContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
    },
    navigationButton: {
        flex: 1,
        height: '100%',
    },
    leftButton: {
        flex: 1,
    },
    rightButton: {
        flex: 1,
    },
});