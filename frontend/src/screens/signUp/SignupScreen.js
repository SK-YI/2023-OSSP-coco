import {
  Keyboard,
  Pressable,
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

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(null);
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();
  // const
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation();

  useEffect(() => {
    setDisabled(!email || !password || password !== passwordConfirm);
  }, [email, password, passwordConfirm]);

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      console.log(email, password);
      setIsLoading(false);
    }
  };
  return (
    <SafeInputView>
      <View style={{ height: '100%', width: '100%', paddingTop: top }}>
        <ScrollView
          style={[styles.container]}
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
                inputType={InputTypes.EMAIL}
                value={email}
                onChangeText={(text) => setEmail(text.trim())}
                // onSubmitEditing={() => passwordRef.current.focus()}
                styles={{ container: { marginBottom: 20 } }}
                returnKeyType={ReturnKeyTypes.NEXT}
              />
              {/* <Pressable
              style={styles.checkbutton}
              hitSlop={10}
              onPress={() => {}}
            >
              <Text>중복 확인</Text>
            </Pressable> */}
            </View>
            <Input
              // ref={passwordRef}
              inputType={InputTypes.PASSWORD}
              value={password}
              onChangeText={(text) => setPassword(text.trim())}
              // onSubmitEditing={() => passwordConfirmRef.current.focus()}
              styles={{ container: { marginBottom: 20 } }}
              returnKeyType={ReturnKeyTypes.NEXT}
            />
            <Input
              // ref={passwordConfirmRef}
              inputType={InputTypes.PASSWORD_CONFIRM}
              value={passwordConfirm}
              onChangeText={(text) => setPasswordConfirm(text.trim())}
              onSubmitEditing={onSubmit}
              styles={{ container: { marginBottom: 20 } }}
              returnKeyType={ReturnKeyTypes.NEXT}
            />
            <Input
              inputType={InputTypes.NICKNAME}
              value={nickname}
              onChangeText={(text) => setNickname(text.trim())}
              onSubmitEditing={onSubmit}
              styles={{ container: { marginBottom: 20 } }}
              returnKeyType={ReturnKeyTypes.NEXT}
            />
            <Input
              inputType={InputTypes.AGE}
              value={age}
              onChangeText={(text) => setAge(text.trim())}
              onSubmitEditing={onSubmit}
              styles={{ container: { marginBottom: 20 } }}
              returnKeyType={ReturnKeyTypes.NEXT}
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
    // flex: 1,
    justifyContent: 'space-between',
  },
  checkButton: {
    borderColor: 'black',
    backgroundColor: 'orange',
    width: 100,
  },
});

export default SignUpScreen;
