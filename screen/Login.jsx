import { useRef, useState } from 'react';
import styled from '@emotion/native';
import { emailRegex, passwordRegex } from '../util';
import { Alert, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../firebase';

export default function Login({ navigation: { goBack } }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  const validateInputs = () => {
    if (!email || !password) {
      const empty = !email ? '이메일' : '비밀번호';
      Alert.alert(`${empty} 없음`, `빈칸을 채워주세요.`, [{ text: '확인', style: 'destructive' }]);

      return true;
    }

    const matchedEmail = email.match(emailRegex);
    const matchedPassword = password.match(passwordRegex);

    if (!matchedEmail) {
      Alert.alert('이메일 주소 부적합', '이메일 주소를 올바르게 입력해주세요.', [{ text: '확인', style: 'default' }]);
      emailRef.current.focus();
      return true;
    }
    if (!matchedPassword) {
      Alert.alert('비밀번호 부적합', '비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.', [
        { text: '확인', style: 'default' },
      ]);
      passwordRef.current.focus();
      return true;
    }

    return false;
  };

  const onSignIn = () => {
    if (validateInputs()) {
      return;
    }
    signInWithEmailAndPassword(authService, email, password)
      .then((_) => {
        setEmail('');
        setPassWord('');
        goBack();
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes('user-not-found')) {
          Alert.alert('가입 내역 없음', '가입된 회원이 아닙니다.', [{ text: '확인', style: 'default' }]);
          return;
        } else if (errorMessage.includes('wrong-password')) {
          Alert.alert('비밀번호 불일치', '비밀번호가 일치하지 않습니다.', [{ text: '확인', style: 'default' }]);
          return;
        }
      });
  };

  const onSignup = () => {
    if (validateInputs()) {
      return;
    }

    createUserWithEmailAndPassword(authService, email, password)
      .then((_) => {
        Alert.alert('가입 완료', '회원 가입이 완료되었습니다.', [{ text: '확인', style: 'default' }]);
        setEmail('');
        setPassWord('');
        goBack();
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes('email-already-in-use')) {
          Alert.alert('존재하는 회원', '이미 가입된 회원입니다.', [{ text: '확인', style: 'default' }]);
        }
      });
  };

  return (
    <LoginWrapper>
      <Input
        ref={emailRef}
        value={email}
        onChangeText={setEmail}
        placeholder={'Enter your email'}
        textContentType={'emailAddress'}
      />
      <Input
        ref={passwordRef}
        value={password}
        onChangeText={setPassWord}
        placeholder={'Enter your password'}
        textContentType={'password'}
        secureTextEntry={true}
      />

      <Button onPress={onSignIn}>
        <ButtonText>Login</ButtonText>
      </Button>
      <TouchableOpacity onPress={onSignup}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin: 60px 0;
  padding: 0 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 46px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  padding: 0 16px;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  border-radius: 4px;
  margin-top: 10px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 700;
`;

const Text = styled.Text`
  margin: 20px 0 10px;
  font-size: 14px;
  color: ${(props) => props.theme.movieText};
`;
