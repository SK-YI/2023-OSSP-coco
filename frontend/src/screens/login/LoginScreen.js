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
import { useUserContext } from '../../contexts/UserContext';
import { URL } from '../../../env';

const LoginScreen = () => {
  const [, setToken] = useUserContext();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

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

  const loginApi = () => {
    const data = {
      username: id,
      password: password,
    };

    fetch(`${URL}/user/login`, {
      method: 'POST', //메소드 지정
      headers: {
        //데이터 타입 지정
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data), //실제 데이터 파싱하여 body에 저장
    })
      .then((res) => res.json()) // 리턴값이 있으면 리턴값에 맞는 req 지정
      .then((res) => {
        console.log(res.accessToken); // 리턴값에 대한 처리
        // setLogin(true);
        setToken(res.accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      // setUser(true); // 로그인
      console.log(id, password); // 로그인 api 하기
      loginApi();
      setIsLoading(false);
      //setLogin(true);
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