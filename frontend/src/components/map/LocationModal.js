import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const LocationModal = ({ modalOpen, setModalOpen }) => {
  return (
    <Modal
      visible={modalOpen}
      animationType="slide"
      transparent={false}
      presentationStyle={'pageSheet'}
    >
      <View>
        <Text>모달창이다~~</Text>
      </View>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => setModalOpen(false)}
          hitSlop={10}
        >
          <Text style={styles.textStyle}>모달창 닫기</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

LocationModal.propTypes = {
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    margin: 10,
    padding: 10,
  },
});

export default LocationModal;
