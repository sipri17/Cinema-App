import { useQuery } from '@apollo/client'
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import MovieCard from '../components/MovieCard'
import { GET_ALL_MOVIES } from '../queries/movie'
import Loader from '../components/Loader'



export default function Movies({ navigation }) {
    const { loading, error, data } = useQuery(GET_ALL_MOVIES)

    if (loading) {
        return <Loader />
    } else if (error) {
        console.error
    }





    return (

        <View style={styles.container} >
            <ImageBackground source={{ uri: "https://www.mordeo.org/files/uploads/2019/07/Chris-Evans-Captain-America-Shield-4K-Ultra-HD-Mobile-Wallpaper.jpg" }} resizeMode="cover" style={styles.image}>
                <View>
                    <Text style={styles.text1}></Text>
                </View>
                <View style={{ flex: 10 }}>
                    <ScrollView>
                        <View style={styles.card}>

                            <View style={styles.container1}>

                                <View style={{ marginBottom: 40, alignContent: "center", }}>
                                    <Text style={styles.title}>Number of Movies</Text>
                                    <Text style={styles.total}>{data?.showAllMovies.length}</Text>

                                </View>
                                <View>

                                </View>
                            </View>
                        </View>


                    </ScrollView>
                </View>
            </ImageBackground>
        </View >



    )


}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"

        // borderRadius: 10
    },
    card: {
        flex: 10,
        // boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)",
        padding: 1,
        marginTop: 5,
        marginBottom: 20,
        flexDirection: "row",
        backgroundColor: "#5e1544",
        borderRadius: 15,
        overflow: "hidden"
    },
    container: {
        flex: 2,
        justifyContent: "center",
        backgroundColor: "black",
    },
    container1: {
        flex: 12,
        justifyContent: "center",

    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 5,
        color: 'white'
    },
    total: {
        textAlign: "center",
        fontSize: 15,
        marginTop: 5,
        color: 'white'
    }
})