import { StyleSheet, View, Text } from "react-native";


const FacilityDatailScreen = () => {
  return (
      <View style = { styles.container }>
          <Text>시설 상세 페이지</Text>
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

export default FacilityDatailScreen