import PropTypes from 'prop-types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PRIMARY, WHITE } from '../../colors';

const CheckButton = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
};

CheckButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DARK,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    color: WHITE,
    fontSize: 15,
    lineHeight: 20,
  },
});

export default CheckButton;
