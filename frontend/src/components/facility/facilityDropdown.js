import { useState } from 'react';
import { View, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GRAY } from '../../colors';

const FacilityDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['italy', 'spain', 'barcelona', 'finland']);

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

  const [items, setItems] = useState(options);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
      borderRadius: 25
    }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='장애 유형을 선택해주세요'
        placeholderStyle={{ color: GRAY.DARK }}
        multiple={true}
        mode="BADGE"
        badgeColors={GRAY.LIGHT}
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        style={{ borderRadius: 25 ,borderColor: 'transparent', ...Platform.select({
          ios: {
            shadowColor: GRAY.DARK,
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          },
          android: {
            elevation: 7,
          },
        }),
      }}
      />
    </View>
  );
}
export default FacilityDropdown