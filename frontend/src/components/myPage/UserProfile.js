import { StyleSheet, Text, View, Image } from 'react-native';
import { GRAY, PRIMARY } from '../../colors';
import PropTypes from 'prop-types';

const UserProfile = ({ userName, userEmail }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('frontend/assets/comap-icon.png')}
        style={styles.image}
      />
      <View>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
    </View>
  );
};

UserProfile.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  styles: PropTypes.object,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: GRAY.LIGHT,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    paddingTop: 50
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
  },
  userEmail: {
    fontSize: 16,
    color: PRIMARY.DARK
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 30,
    borderRadius: 50
  },
});

export default UserProfile;
