import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Input, {
  InputTypes,
  ReturnKeyTypes,
} from '../../components/login/Input';
import { useEffect, useState } from 'react';
import Button from '../../components/login/Button';
import SafeInputView from '../../components/login/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import TextButton from '../../components/login/TextButton';
import { AuthRoutes } from '../../navigations/routes';
import HR from '../../components/login/HR';
import CheckButton from '../../components/signup/CheckButton';
import RadioButton from '../../components/signup/RadioButton';
import SignupDropdown from '../../components/signup/SignupDropDown';
import { URL } from '../../../env';

const SignUpScreen = () => {
  const [id, setId] = useState('');
  const [idCheck, setIdCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(0); // 0: 남자, 1: 여자
  const [disability, setDisability] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation();

  useEffect(() => {
    // 필수 값 체크!
    setDisabled(
      !idCheck ||
        !email ||
        !password ||
        password !== passwordConfirm ||
        !email ||
        !nickname ||
        !disability
    );
  }, [idCheck, email, password, passwordConfirm, nickname, disability]);

  const onChangeId = (text) => {
    setId(text);
    setIdCheck(false);
  };

  const signUpApi = () => {
    const data = {
      username: id,
      password: password,
      email: email,
      nickname: nickname,
      age: age,
      gender: gender,
      userType: disability,
    };
    console.log(data);
    fetch(`${URL}/user/join`, {
      method: 'POST', //메소드 지정
      headers: {
        //데이터 타입 지정
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data), //실제 데이터 파싱하여 body에 저장
    })
      .then((res) => res.json()) // 리턴값이 있으면 리턴값에 맞는 req 지정
      .then((res) => {
        console.log(res); // 리턴값에 대한 처리
        navigate(AuthRoutes.LOG_IN);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const signUpApi = async () => {
  //   const data = {
  //     username: id,
  //     password: password,
  //     email: email,
  //     nickname: nickname,
  //     age: age, // 필수값 아님..?
  //     // 성별이랑 장애유형도 넣을 수 있어야 함
  //     // gender: gender,
  //     // type: disability,
  //   };

  //   try {
  //     const response = await axios.post(`${URL}/user/join`, data);
  //     console.log(response.data);
  //     // 회원가입 성공하면 로그인 페이지로 이동하기!
  //     navigate(AuthRoutes.LOG_IN);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      // 회원가입 api 넣기
      signUpApi();

      setIsLoading(false);
    } else if (disabled) {
      Alert.alert('회원가입 실패', '필수값을 입력해주세요.', [
        { text: '확인', onPress: () => {} },
      ]);
    }
  };

  const checkIdApi = () => {
    const data = {
      username: id,
    };
    fetch(`${URL}/user/join/username`, {
      method: 'POST', //메소드 지정
      headers: {
        //데이터 타입 지정
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data), //실제 데이터 파싱하여 body에 저장
    })
      .then((res) => res.json()) // 리턴값이 있으면 리턴값에 맞는 req 지정
      .then((res) => {
        console.log(res); // 리턴값에 대한 처리
        if (res) {
          Alert.alert('아이디 중복', '아이디값이 중복됩니다.', [
            { text: '확인', onPress: () => {} },
          ]);
        } else {
          setIdCheck(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const checkIdApi = async () => {
  //   const data = {
  //     username: id,
  //   };

  //   try {
  //     const response = await axios.post(`${URL}/user/join/username`, data);
  //     console.log(response.data);
  //     // 중복확인 성공하면
  //     setIdCheck(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onCheckId = () => {
    Keyboard.dismiss();
    if (!id) {
      Alert.alert('아이디 중복 확인 실패', '아이디값을 입력해주세요.', [
        { text: '확인', onPress: () => {} },
      ]);
    } else {
      // ID 중복확인 api 넣기
      checkIdApi();
    }
  };

  return (
    <SafeInputView>
      <View style={{ height: '100%', width: '100%', paddingTop: top }}>
        <ScrollView
          style={[styles.container]}
          keyboardShouldPersistTaps={'always'}
          // contentContainerStyle={{ height: '100%' }}
        >
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              height: '100%',
              flex: 1,
            }}
          >
            <View>
              <Text style={styles.title}>회원가입</Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                inputType={InputTypes.ID}
                value={id}
                onChangeText={(text) => onChangeId(text.trim())}
                // onSubmitEditing={() => passwordRef.current.focus()}
                styles={{ container: { marginBottom: 20 } }}
                returnKeyType={ReturnKeyTypes.NEXT}
                star={true}
              />
              <CheckButton
                title={'중복 확인'}
                onPress={onCheckId}
                idCheck={idCheck}
              />
            </View>
            <Input
              // ref={passwordRef}
              inputType={InputTypes.PASSWORD}
              value={password}
              onChangeText={(text) => setPassword(text.trim())}
              // onSubmitEditing={() => passwordConfirmRef.current.focus()}
              styles={{ container: { marginBottom: 20 } }}
              returnKeyType={ReturnKeyTypes.NEXT}
              star={true}
            />
            <Input
              // ref={passwordConfirmRef}
              inputType={InputTypes.PASSWORD_CONFIRM}
              value={passwordConfirm}
              onChangeText={(text) => setPasswordConfirm(text.trim())}
              onSubmitEditing={onSubmit}
              styles={{ container: { marginBottom: 20 } }}
              returnKeyType={ReturnKeyTypes.NEXT}
              star={true}
            />
            <Input
              inputType={InputTypes.EMAIL}
              value={email}
              onChangeText={(text) => setEmail(text.trim())}
              // onSubmitEditing={() => passwordRef.current.focus()}
              styles={{ container: { marginBottom: 20 } }}
              returnKeyType={ReturnKeyTypes.NEXT}
              star={true}
            />
            <Input
              inputType={InputTypes.NICKNAME}
              value={nickname}
              onChangeText={(text) => setNickname(text.trim())}
              onSubmitEditing={onSubmit}
              styles={{ container: { marginBottom: 20 } }}
              returnKeyType={ReturnKeyTypes.NEXT}
              star={true}
            />
            <Input
              inputType={InputTypes.AGE}
              value={age}
              onChangeText={(text) => setAge(text.trim())}
              onSubmitEditing={onSubmit}
              styles={{ container: { marginBottom: 20 } }}
              returnKeyType={ReturnKeyTypes.NEXT}
              star={true}
            />
            <RadioButton gender={gender} setGender={setGender} />
            <SignupDropdown
              disability={disability}
              setDisability={setDisability}
            />
            <Button
              title={'회원가입'}
              disabled={disabled}
              isLoading={isLoading}
              onPress={onSubmit}
              styles={{ container: { marginTop: 20 } }}
            />
            <HR text={'OR'} styles={{ container: { marginVertical: 20 } }} />
            <View>
              <TextButton
                title={'로그인'}
                onPress={() => navigate(AuthRoutes.LOG_IN)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 50,
  },
  title: {
    paddingBottom: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 45,
  },
  checkButton: {
    borderColor: 'black',
    backgroundColor: 'orange',
    width: 100,
  },
});

export default SignUpScreen;
