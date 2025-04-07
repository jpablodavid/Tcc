import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8d7b0',
    },
    logo: {
        width: '80%',
        height: 200,
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#ff6b6b',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        color: '#666',
        fontSize: 16,
    },
});