import { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

const FacilityDetailScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  const handleItemSelect = (item) => {
    // console.log(item);
    setItems(item);
    setSelectedItems((prevSelectedItems) => [item, ...prevSelectedItems]);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <DropDownPicker
        open={open}
        items={items}
        setOpen={setOpen}
        setValue={handleItemSelect}
        setItems={setItems}
        defaultValue={null}
        placeholder="Select an item"
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => handleItemSelect(item)}
      />

      <View style={{ marginTop: 20 }}>
        {selectedItems.map((item, label) => (
          <Text
            key={label}
            style={{ backgroundColor: 'lightblue', padding: 5, marginRight: 5 }}
          >
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default FacilityDetailScreen;
