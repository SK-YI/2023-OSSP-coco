import { StyleSheet, View, Text } from "react-native";


const CommunityScreen = () => {
  return (
      <View style = { styles.container }>
          <Text>커뮤니티 메인화면</Text>
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

export default CommunityScreen