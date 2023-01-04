import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Foundation } from '@expo/vector-icons';
import Movies from '../screen/Movies';
import My from '../screen/My';
import { TITLE_COLOR, TITLE_DARK_COLOR } from '../colors';
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        headerTitleStyle: { color: isDark ? TITLE_DARK_COLOR : TITLE_COLOR },
        headerTintColor: isDark ? TITLE_DARK_COLOR : TITLE_COLOR,
        tabBarActiveTintColor: isDark ? TITLE_DARK_COLOR : TITLE_COLOR,
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="local-movies" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          tabBarIcon: ({ color, size }) => <Foundation name="social-myspace" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
