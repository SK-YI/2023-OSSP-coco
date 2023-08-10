import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUpScreen</Text>
    </View>
  );
};

SignUpScreen.propTypes = {
  // PropTypes
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default SignUpScreen;
