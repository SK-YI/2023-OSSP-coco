import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from '../../colors';

export const InputTypes = {
  ID: 'ID',
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  PASSWORD_CONFIRM: 'PASSWORD_CONFIRM',
  NICKNAME: 'NICKNAME',
  AGE: 'AGE',
  // 성별 추가하기
  // 장애 유형 추가하기
};

const PasswordProps = {
  keyboardType: 'default',
  secureTextEntry: true,
  iconName: { active: 'lock', inactive: 'lock-outline' },
};

const InputTypeProps = {
  ID: {
    title: '아이디',
    placeholder: '아이디를 입력해주세요.',
    keyboardType: 'default',
    secureTextEntry: false,
    iconName: { active: 'account-key', inactive: 'account-key-outline' },
  },
  EMAIL: {
    title: '이메일',
    placeholder: '이메일를 입력해주세요.',
    keyboardType: 'email-address',
    secureTextEntry: false,
    iconName: { active: 'email', inactive: 'email-outline' },
  },
  PASSWORD: {
    title: '비밀번호',
    placeholder: '비밀번호를 입력해주세요.',
    ...PasswordProps,
  },
  PASSWORD_CONFIRM: {
    title: '비밀번호 확인',
    placeholder: '비밀번호를 입력해주세요.',
    ...PasswordProps,
  },
  NICKNAME: {
    title: '닉네임',
    placeholder: '닉네임을 입력해주세요.',
    keyboardType: 'default',
    secureTextEntry: false,
    iconName: { active: 'account', inactive: 'account-outline' },
  },
  AGE: {
    title: '나이',
    placeholder: '나이를 입력해주세요.',
    keyboardType: 'numeric',
    secureTextEntry: false,
    iconName: { active: 'numeric-0-box', inactive: 'numeric-0-box-outline' },
  },
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

const Input = forwardRef(({ inputType, styles, star, ...props }, ref) => {
  const {
    title,
    placeholder,
    keyboardType,
    secureTextEntry,
    iconName: { active, inactive },
  } = InputTypeProps[inputType];

  const [isFocused, setIsFocused] = useState(false);
  const { value } = props;
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Text
        style={[
          defaultStyles.title,
          { color: value || isFocused ? PRIMARY.DARK : GRAY.DARK },
          styles?.title,
        ]}
      >
        {title}
        {star && <Text style={{ color: 'red' }}>*</Text>}
      </Text>

      <View>
        <TextInput
          ref={ref}
          {...props}
          style={[
            defaultStyles.input,
            {
              borderColor: value || isFocused ? PRIMARY.DARK : GRAY.DARK,
              color: value || isFocused ? PRIMARY.DARK : GRAY.DARK,
            },
            styles?.input,
          ]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          autoCapitalize={'none'}
          autoCorrect={false}
          textContentType={'none'}
          keyboardAppearance={'light'}
        />
        <View style={[defaultStyles.icon, styles?.icon]}>
          <MaterialCommunityIcons
            name={isFocused ? active : inactive}
            size={24}
            color={value || isFocused ? PRIMARY.DARK : GRAY.DARK}
          />
        </View>
      </View>
    </View>
  );
});
Input.displayName = 'Input';

Input.defaultProps = {
  star: false,
};

Input.propTypes = {
  inputType: PropTypes.oneOf(Object.values(InputTypes)),
  star: PropTypes.bool,
  value: PropTypes.string,
  styles: PropTypes.object,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: 4,
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    height: 42,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },
});

export default Input;
