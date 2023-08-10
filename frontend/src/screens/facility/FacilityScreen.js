import { StyleSheet, View, Text } from "react-native";


const FacilityScreen = () => {
  return (
      <View style = { styles.container }>
          <Text>시설 메인화면</Text>
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

export default FacilityScreen