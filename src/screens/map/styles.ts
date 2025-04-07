import { StyleSheet, ImageBackground } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 40,
    },
    button: {
        backgroundColor: '#CC7722',
        borderColor: '#cc77',
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFED',
        fontSize: 24,
        fontWeight: 'bold',
    },
});