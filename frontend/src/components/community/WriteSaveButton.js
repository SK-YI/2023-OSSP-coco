import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY, WHITE } from '../../colors';

const WriteSaveButton = ({ onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={10}
      style={styles.button}
    >
      <Text style={styles.text}>등록</Text>
    </Pressable>
  );
};

WriteSaveButton.defaultProps = {
  disabled: false,
};

WriteSaveButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY.DARK,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  text: {
    color: WHITE,
  },
});
export default WriteSaveButton;
