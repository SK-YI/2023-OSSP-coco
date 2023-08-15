import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Badge = ({ selectedItems }) => {
  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        {selectedItems.map((item, index) => (
          <View key={index} style={styles.badge}>
            <Text style={styles.badgeText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

Badge.propTypes = {
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  badge: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 20,
    margin: 5,
  },
  badgeText: {
    color: 'white',
  },
});

export default Badge;
