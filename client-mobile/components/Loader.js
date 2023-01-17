import { ActivityIndicator, View } from 'react-native'


export default function Loader(){
    return (
        <View style={{ justifyContent: "center", marginVertical: 200 }}>
            <ActivityIndicator size="large" color="#Ff0032" />
        </View>
    )
}