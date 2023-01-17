import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';

export default function MovieCard({ movie, navigation }) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: movie.imgUrl,
        }}
        resizeMode='contain'
      />
      <View style={styles.container}>
        <View style={{ marginBottom: 40, alignContent: "center", }}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.rating}>Rating {movie.rating}</Text>
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#1780b2' : '#33691E',
              borderRadius: 7, width: "50%", ...styles.button
            })}
            title="See Detail"
            onPress={
              () =>
                navigation.navigate("Detail", {
                  id: movie.id,
                })
            }
          >
            <Text style={{
              textAlign: 'center',
              fontSize: 15,
              color: '#ffff',
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 2,
              paddingBottom: 2
            }}>See Detail </Text>
          </Pressable>
        </View>
        <View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 200,
    width: 200,
    resizeMode: "cover"

    // borderRadius: 10
  },
  card: {
    flex: 1,
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

  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    color: 'white'
  },
  button: {
    flex: 2,
    justifyContent: "center",
    // backgroundColor: "yellow",
    display: "flex",
    width: "auto",
    fontSize: "14px",
    marginHorizontal: 70,
    marginTop: 60
  },
  rating: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 5,
    color: 'white'
  }
})