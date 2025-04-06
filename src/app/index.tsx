import{ View, Text} from "react-native"

import { Button } from "@/components/button"

export default function Index(){
    return(
        <View>
            <Text style={{color: "red", fontSize: 20}}>
                hello World
            </Text>
            <Button title="clique aqui" />
        </View>
    )
}