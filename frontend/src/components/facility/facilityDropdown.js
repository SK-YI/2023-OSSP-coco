import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GRAY } from '../../colors';

const FacilityDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['italy', 'spain', 'barcelona', 'finland']);
  const [items, setItems] = useState([
    {label: '유형 1', value: 'type1'},
    {label: '세부유형 1', value: 'detailtype1', parent: 'type1'},
    {label: '세부유형 2', value: 'detailtype2', parent: 'type1'},
    {label: '유형 2', value: 'type2'},
    {label: '세부유형 3', value: 'detailtype3', parent: 'type2'},
    {label: '유형 3', value: 'type3'}
  ]);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
    }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='장애 유형을 선택해주세요'
        multiple={true}
        mode="BADGE"
        badgeColors={GRAY.LIGHT}
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        style={{ borderColor: 'transparent' }}
      />
    </View>
  );
}
export default FacilityDropdown