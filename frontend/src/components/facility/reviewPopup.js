import { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, StyleSheet } from 'react-native';
import { PRIMARY, WHITE } from '../../colors';
import PropTypes from 'prop-types';

const WriteReviewPopup = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [score, setScore] = useState(0);

  const handleSave = () => {
    onSave({ title, content, score });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Text style={styles.popupTitle}>리뷰 작성</Text>
          <TextInput
            placeholder="제목"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="본문"
            value={content}
            onChangeText={setContent}
            multiline
            style={[styles.input, styles.multilineInput]}
          />
          <View style={styles.buttonContainer}>
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>저장</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

WriteReviewPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired, 
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: '80%',
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    borderColor: PRIMARY.DARK,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  multilineInput: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    backgroundColor: PRIMARY.DARK,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  saveButtonText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: PRIMARY.LIGHT,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: PRIMARY.DARK,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default WriteReviewPopup;
