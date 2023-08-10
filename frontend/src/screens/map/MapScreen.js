import { StyleSheet, View, Text } from "react-native";


const MapScreen = () => {
  return (
      <View style = { styles.container }>
          <Text>지도 화면</Text>
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

export default MapScreen