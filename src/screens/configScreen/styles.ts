import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8d7b0',
        paddingTop: 50,
    },
    infoPanel: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    moves: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    target: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    muteButton: {
        padding: 10,
    },
    muteIcon: {
        width: 24,
        height: 24,
    },
});