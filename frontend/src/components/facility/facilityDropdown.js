import { useState } from 'react';
import { View, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GRAY } from '../../colors';

const FacilityDropdown = ({ onDropdownClose }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const options = [
    { label: '한국장애인고용공단 및 지사', value: '한국장애인고용공단 및 지사' },
    { label: '특수학교', value: '특수학교' },
    { label: '종합병원', value: '종합병원' },
    { label: '장애인복지시설', value: '장애인복지시설' },
    { label: '병원·치과병원·한방병원·정신병원·요양병원', value: '병원·치과병원·한방병원·정신병원·요양병원' },
    { label: '노인복지시설(경로당포함)', value: '노인복지시설(경로당포함)' },
  ];

  const [items, setItems] = useState(options);

  const handleDropdownClose = () => {
    if (value) {
      onDropdownClose(value);
    }
  };

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
        placeholder='시설 타입을 선택해주세요'
        placeholderStyle={{ color: GRAY.DARK }}
        multiple={false}
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
        onClose={handleDropdownClose}
      />
    </View>
  );
};

export default FacilityDropdown;
