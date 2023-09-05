import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { PRIMARY } from '../../colors';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const options = [
  { label: '지체장애', value: '지체장애' },
  { label: '뇌병변장애', value: '뇌병변장애' },
  { label: '시작장애', value: '시작장애' },
  { label: '청각장애', value: '청각장애' },
  { label: '언어장애', value: '언어장애' },
  { label: '안면장애', value: '안면장애' },
  { label: '신장장애', value: '신장장애' },
  { label: '심장장애', value: '심장장애' },
  { label: '간장애', value: '간장애' },
  { label: '호흡기장애', value: '호흡기장애' },
  { label: '장루, 요루장애', value: '장루, 요루장애' },
  { label: '간질장애', value: '간질장애' },
  { label: '지적장애', value: '지적장애' },
  { label: '자폐성장애', value: '자폐성장애' },
  { label: '정신장애', value: '정신장애' },
];

const SignupDropdown = ({ disability, setDisability }) => {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  const [items, setItems] = useState(options);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        장애 유형<Text style={styles.star}>*</Text>
      </Text>
      <DropDownPicker
        open={open}
        value={disability}
        items={items}
        setOpen={setOpen}
        setValue={setDisability}
        setItems={setItems}
        placeholder="장애 유형을 선택해주세요."
        style={styles.dropdown}
        // dropDownStyle={{
        //   borderColor: PRIMARY.DARK,
        //   backgroundColor: '#fafafa',
        // }}
        // multiple={true}
        mode="BADGE"
        listMode="MODAL"
        badgeDotColors={[
          '#e76f51',
          '#00b4d8',
          '#e9c46a',
          '#e76f51',
          '#8ac926',
          '#00b4d8',
          '#e9c46a',
        ]}
        modalProps={{
          animationType: 'fade',
        }}
        modalTitle="장애 유형을 선택해주세요."
      />
    </View>
  );
};

SignupDropdown.propTypes = {
  disability: PropTypes.string,
  setDisability: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 20,
    width: '100%',
  },
  title: {
    paddingRight: 20,
  },
  star: {
    color: 'red',
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: PRIMARY.DARK,
    marginTop: 10,
    width: '100%',
  },
});

export default SignupDropdown;
