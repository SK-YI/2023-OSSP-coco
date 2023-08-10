import { StyleSheet, View, Text } from "react-native";


const MyPageScreen = () => {
  return (
      <View style = { styles.container }>
          <Text>마이페이지 화면</Text>
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

export default MyPageScreen