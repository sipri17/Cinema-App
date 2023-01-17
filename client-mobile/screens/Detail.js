import { useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect, useState } from "react"
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import DetailContent from "../components/DetailContent";
import { GET_MOVIE_BY_ID } from "../queries/movie";

export default function Detail({ route, navigation }) {

    const { id } = route.params
    const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
        variables: {
            "showMovieByIdId": Number(id)
        }
    })

    console.log(data);

  


    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.title}>{data?.showMovieById.title}</Text>
                <Image
                    style={styles.image}
                    source={{
                        uri: data?.showMovieById.imgUrl,
                    }}
                    resizeMode='contain'
                />
                {data?.showMovieById ? <DetailContent movie={data.showMovieById} />  : ""}



            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        //   flex: 1,
        width: 500,
        height: 400,
        marginTop: 10
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        marginHorizontal: 12,
        color: "white"
    },
    synopsis: {
        marginVertical: 20,
        paddingHorizontal: 15,
        color: "white"
    },
    container: {
        flex: 1,
        backgroundColor: "#5e1544",
    }
})