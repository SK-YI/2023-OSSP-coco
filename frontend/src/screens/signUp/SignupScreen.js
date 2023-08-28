import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import CheckButton from '../../components/login/CheckButton';
import RadioButton from '../../components/signup/RadioButton';
import SignupDropdown from '../../components/signup/SignupDropDown';

const SignUpScreen = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(0); // 0: 남자, 1: 여자
  const [disability, setDisability] = useState([]);
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation();

  useEffect(() => {
    // 필수 값 체크!
    setDisabled(!email || !password || password !== passwordConfirm);
  }, [email, password, passwordConfirm]);

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      // console.log(email, password);
      setIsLoading(false);
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
                onChangeText={(text) => setId(text.trim())}
                // onSubmitEditing={() => passwordRef.current.focus()}
                styles={{ container: { marginBottom: 20 } }}
                returnKeyType={ReturnKeyTypes.NEXT}
                star={true}
              />
              <CheckButton title={'중복 확인'} onPress={() => {}} />
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
