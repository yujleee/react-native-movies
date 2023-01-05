import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { authService } from '../firebase';
import styled from '@emotion/native';
import { Text, Alert } from 'react-native';
import { Button, ButtonText } from './Login';
import { signOut } from 'firebase/auth';

export default function My({ navigation: { reset, goBack } }) {
  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        reset({
          index: 1,
          routes: [
            { name: 'Tabs', params: { screen: 'Movies' } },
            { name: 'Stacks', params: { screen: 'Login' } },
          ],
        });
      }

      return;
    }, [])
  );

  const onSignOut = () => {
    signOut(authService)
      .then(() => {
        Alert.alert('로그아웃', '로그아웃 되었습니다.', [{ text: '확인', style: 'default' }]);
        goBack();
      })
      .catch((error) => console.log(error));
  };

  return (
    <MyWrapper>
      <Text>My</Text>
      <Button onPress={onSignOut}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </MyWrapper>
  );
}

const MyWrapper = styled.View`
  padding: 0 20px;
  justify-content: center;
  align-items: center;
`;
