import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from '../../colors';
import PropTypes from 'prop-types';

const RadioButton = ({ gender, setGender }) => {
  return (
    <View style={styles.radioButtonContainer}>
      <Text>성별</Text>
      <Pressable style={styles.radioButton} onPress={() => setGender(0)}>
        <MaterialCommunityIcons
          style={styles.radioButtonicon}
          name={
            gender === 0
              ? 'checkbox-marked-circle'
              : 'checkbox-blank-circle-outline'
          }
          size={25}
          color={gender == 0 ? PRIMARY.DARK : GRAY.DARK}
        />
        <Text style={{ color: gender == 0 ? PRIMARY.DARK : GRAY.DARK }}>
          남자
        </Text>
      </Pressable>
      <Pressable style={styles.radioButton} onPress={() => setGender(1)}>
        <MaterialCommunityIcons
          style={styles.radioButtonicon}
          name={
            gender === 1
              ? 'checkbox-marked-circle'
              : 'checkbox-blank-circle-outline'
          }
          size={25}
          color={gender == 1 ? PRIMARY.DARK : GRAY.DARK}
        />
        <Text style={{ color: gender == 1 ? PRIMARY.DARK : GRAY.DARK }}>
          여자
        </Text>
      </Pressable>
    </View>
  );
};

RadioButton.propTypes = {
  gender: PropTypes.number,
  setGender: PropTypes.func,
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginHorizontal: 30,
  },
  radioButtonicon: {
    paddingRight: 10,
    paddingTop: 3,
  },
});

export default RadioButton;
