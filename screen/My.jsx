import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { authService } from '../firebase';
import { View, Text } from 'react-native';

export default function My({ navigation: { reset } }) {
  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        reset({
          index: 1,
          routes: [
            { name: 'Tabs', params: { screen: 'Moives' } },
            { name: 'Stacks', params: { screen: 'Login' } },
          ],
        });
      }

      return;
    }, [])
  );

  return (
    <View>
      <Text>My</Text>
    </View>
  );
}
