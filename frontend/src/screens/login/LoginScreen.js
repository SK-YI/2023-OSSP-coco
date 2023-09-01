import { Alert, Image, Keyboard, StyleSheet, View } from 'react-native';
import Input, { InputTypes } from '../../components/login/Input';
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../../components/login/Button';
import SafeInputView from '../../components/login/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TextButton from '../../components/login/TextButton';
import { AuthRoutes } from '../../navigations/routes';
import HR from '../../components/login/HR';
import { useUserState } from '../../contexts/UserContext';
import axios from 'axios';
import { URL } from '../../../env';

const LoginScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [, setUser] = useUserState();

  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setId('');
        setPassword('');
        setIsLoading(false);
        setDisabled(true);
      };
    }, [])
  );

  useEffect(() => {
    setDisabled(!id || !password);
  }, [id, password]);

  const loginApi = async () => {
    const data = {
      username: id,
      password: password,
    };

    try {
      const response = await axios.post(`${URL}/user/login`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      setUser(true); // 로그인
      console.log(id, password); // 로그인 api 하기
      loginApi();
      setIsLoading(false);
    } else if (disabled) {
      Alert.alert('로그인 실패', '아이디, 비밀번호를 올바르게 입력해주세요.', [
        { text: '확인', onPress: () => {} },
      ]);
    }
  };

  return (
    <SafeInputView>
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={styles.image}>
          <Image
            source={require('../../../assets/comap.png')}
            style={{ width: 250, height: 250 }}
            // resizeMode={'cover'}
          />
        </View>
        <Input
          inputType={InputTypes.ID}
          value={id}
          onChangeText={(text) => setId(text.trim())}
          onSubmitEditing={() => passwordRef.current.focus()}
          styles={{ container: { marginBottom: 20 } }}
        />
        <Input
          ref={passwordRef}
          inputType={InputTypes.PASSWORD}
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          onSubmitEditing={onSubmit}
          styles={{ container: { marginBottom: 20 } }}
        />
        <Button
          title={'로그인'}
          disabled={disabled}
          isLoading={isLoading}
          onPress={onSubmit}
          styles={{ container: { marginTop: 20 } }}
        />
        <HR text={'OR'} styles={{ container: { marginVertical: 20 } }} />
        <TextButton
          title={'회원가입'}
          onPress={() => navigate(AuthRoutes.SIGN_UP)}
        />
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
  },
  image: {
    height: '30%',
    marginBottom: 30,
  },
});

export default LoginScreen;
