import { StyleSheet, View, Text } from "react-native";

const StartPageScreen = () => {
  return (
      <View style = { styles.container }>
          <Text>시작 메인 화면</Text>
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

export default StartPageScreen