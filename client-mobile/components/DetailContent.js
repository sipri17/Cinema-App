import { StyleSheet, Text } from "react-native";

export default function DetailContent({ movie }) {
    return (
        <>
            <Text style={styles.synopsis} > {movie.synopsis}</Text>
            {movie.Casts?.length ? <Text style={styles.synopsis} >Casts : {movie.Casts?.length ? movie.Casts.map(el => el.name + ", ") : ""}</Text> : <></>}

            <Text style={styles.synopsis} >By: {movie?.User ? movie.User.username : ""}</Text>
            <Text style={styles.synopsis} > Rating: {movie.rating}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        //   flex: 1,
        width: 500,
        height: 400,
        marginTop: 10
    },
    synopsis: {
        marginVertical: 20,
        paddingHorizontal: 15,
        color: "white"
    }
})