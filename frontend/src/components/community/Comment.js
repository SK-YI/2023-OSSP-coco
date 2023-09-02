import { Dimensions, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY } from '../../colors';

const Comment = ({ data }) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={[styles.container, { width: windowWidth - 50 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.nickname}>{data.nickname}</Text>
        <Text style={styles.content}>{data.content}</Text>
        <Text style={styles.date}>{data.createdDate}</Text>
      </View>
    </View>
  );
};

Comment.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column',
  },
  nickname: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  content: {
    fontSize: 15,
    lineHeight: 25,
  },
  explainContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  date: {
    fontSize: 15,
    lineHeight: 20,
    color: PRIMARY.DARK,
  },
});

export default Comment;
