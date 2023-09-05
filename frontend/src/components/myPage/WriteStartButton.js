import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, PRIMARY } from '../../colors';

const WriteStartButton = ({ onPress, disabled, text }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={10}
      style={styles.button}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

WriteStartButton.defaultProps = {
  disabled: false,
};

WriteStartButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.text,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY.LIGHT,
    marginHorizontal: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    paddingBottom: 3,
    color: BLACK,
    fontSize: 15,
    fontWeight: '500',
  },
});
export default WriteStartButton;
