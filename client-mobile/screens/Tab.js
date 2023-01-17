import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import Home from './Home'
import Detail from './Detail'
import Movies from './Movies'

export default function BottomTabNavigator() {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'ios-home'
                        : 'ios-home-outline';
                } else if (route.name === 'Movies') {
                    iconName = focused ? 'film' : 'film-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false
        })} >
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false
            }} />
            <Tab.Screen name="Movies" component={Movies} options={{
                headerShown: false
            }} />
           

        </Tab.Navigator>
    )
}