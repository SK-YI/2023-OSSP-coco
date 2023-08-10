import { StyleSheet, View, Text } from "react-native";


const LoginScreen = () => {
  return (
      <View style = { styles.container }>
          <Text>로그인 화면</Text>
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen