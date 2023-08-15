import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { PRIMARY } from '../../colors';
import PropTypes from 'prop-types';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

const FacilityDropdown = ({ onItemSelected }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(options);

  const handleItemSelect = (selectedValue) => {
    setValue(selectedValue);
    if (onItemSelected) {
      onItemSelected(selectedValue);
    }
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={handleItemSelect}
      setItems={setItems}
      placeholder="장애 유형을 선택해주세요"
      style={{
        backgroundColor: '#fafafa',
        borderColor: PRIMARY.DARK,
      }}
      dropDownStyle={{
        borderColor: PRIMARY.DARK,
        backgroundColor: '#fafafa',
      }}
    />
  );
};

FacilityDropdown.propTypes = {
  onItemSelected: PropTypes.func,
};

export default FacilityDropdown;
