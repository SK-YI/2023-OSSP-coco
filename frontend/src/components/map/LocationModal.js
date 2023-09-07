import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';

const LocationModal = ({ item, modalOpen, setModalOpen }) => {
  useEffect(() => {
    console.log(item);
  }, [item]);
  return (
    <Modal
      visible={modalOpen}
      animationType="slide"
      transparent={false}
      presentationStyle={'pageSheet'}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.button}
          onPress={() => setModalOpen(false)}
          hitSlop={10}
        >
          <MaterialCommunityIcons
            name={'close-box'}
            size={24}
            style={styles.icon}
          />
        </Pressable>
      </View>
      <View>
        <Text>모달창이다~~</Text>
      </View>
    </Modal>
  );
};

LocationModal.propTypes = {
  item: PropTypes.object,
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 10,
    padding: 10,
  },
  icon: {
    color: 'gray',
    fontSize: 30,
  },
});

export default LocationModal;
