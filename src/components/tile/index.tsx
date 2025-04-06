import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    title: string
}

export function Tile({ title, ...rest}: Props){
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.button} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}