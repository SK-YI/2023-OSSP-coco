import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from '../../colors';
import { forwardRef } from 'react';
import { MAP_KEY } from '../../../env';

const LocationSearch = forwardRef(
  ({ styles, onPress, isLoading, isSelected, iconVisible }, ref) => {
    return (
      <View style={[defaultStyles.container, styles?.container]}>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder={'편의 시설을 검색해주세요.'}
          query={{ key: MAP_KEY, language: 'ko' }}
          onPress={onPress}
          onFail={(e) => {
            // eslint-disable-next-line no-console
            console.log('GooglePlacesAutocomplete : ', e);
          }}
          styles={{
            container: { flex: 0 },
            textInput: { paddingLeft: iconVisible ? 30 : 10 },
          }}
          debounce={400}
          enablePoweredByContainer={false}
          textInputProps={{ editable: !isLoading }}
          fetchDetails={true}
        />

        {iconVisible && (
          <View style={[defaultStyles.icon, styles?.icon]}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={isSelected ? PRIMARY.DEFAULT : GRAY.DARK}
            />
          </View>
        )}
      </View>
    );
  }
);
LocationSearch.displayName = 'LocationSearch';

LocationSearch.defaultProps = {
  iconVisible: true,
};

LocationSearch.propTypes = {
  styles: PropTypes.object,
  onPress: PropTypes.func,
  isLoading: PropTypes.bool,
  isSelected: PropTypes.bool,
  iconVisible: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.LIGHT,
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: 16,
  },
});

export default LocationSearch;
