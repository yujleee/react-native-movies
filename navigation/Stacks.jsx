import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Movies from '../screen/Movies';
import My from '../screen/My';
import Detail from '../screen/Detail';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TITLE_COLOR, TITLE_DARK_COLOR } from '../colors';

const Stack = createNativeStackNavigator();

export default function Stacks({ navigation: { goBack } }) {
  const isDark = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: isDark ? TITLE_DARK_COLOR : TITLE_COLOR,
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Ionicons name="chevron-back" size={24} color={isDark ? TITLE_DARK_COLOR : TITLE_COLOR} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Movies" component={Movies} />
      <Stack.Screen name="My" component={My} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
