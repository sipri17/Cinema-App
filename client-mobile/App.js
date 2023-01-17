import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from './screens/Detail';
import Tab from './screens/Tab'
import { ApolloProvider } from '@apollo/client'
import { client } from './config/apolloClient';

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <ApolloProvider client={client} >
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tab" component={Tab} options={{
              headerShown: false
            }} />
            <Stack.Screen name="Movies" component={Home} options={{ title: "Movies"}} />
            <Stack.Screen name="Detail" component={Detail} options={{ title: "Movie Detail" }} />

          </Stack.Navigator>

        </NavigationContainer>
      </SafeAreaView>
    </ApolloProvider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
