import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY, WHITE } from '../../colors';

const WriteStartButton = ({ onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={10}
      style={styles.button}
    >
      <Text style={styles.text}>수정</Text>
    </Pressable>
  );
};

WriteStartButton.defaultProps = {
  disabled: false,
};

WriteStartButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY.DARK,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    paddingBottom: 3,
    color: WHITE,
    fontSize: 15,
  },
});
export default WriteStartButton;
