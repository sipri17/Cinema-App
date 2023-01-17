import { useQuery } from '@apollo/client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import Loader from '../components/Loader'
import MovieCard from '../components/MovieCard'
import { GET_ALL_MOVIES } from '../queries/movie'



export default function Movies({ navigation }) {

    const {loading,error,data} = useQuery(GET_ALL_MOVIES)

    if(loading) {
        return <Loader/>
    }else if(error){
        console.error
    }

    return (
        <View style={styles.container} >
            <View>
                <Text style={styles.text1}>Movies</Text>
            </View>
            <View style={{ flex: 10 }}>
                <ScrollView>
                    {data?.showAllMovies.length ? data.showAllMovies.map((movie, i) => {
                        return <MovieCard movie={movie} key={i} navigation={navigation} />
                    }) : <></>}

                </ScrollView>
            </View>
        </View>


    )


}

const styles = StyleSheet.create({
    text1: {
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        fontSize: 25,

    },
    container: {
        flex: 1,
        backgroundColor: "black",
    }
})