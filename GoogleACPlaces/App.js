import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker} from 'react-native-maps';

var screenWidth = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      latitude: 3.139,
      longitude: 101.6869,
    };
  }

  onRegionChange(region, latitude, longitude) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      latitude: latitude || this.state.latitude,
      longitude: longitude || this.state.longitude,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          onRegionChange={(regions) => {
            this.setState({
              mapRegion: regions,
            });
          }}
          onPress={(e) => {
            const region = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.00922 * 1.5,
              longitudeDelta: 0.00421 * 1.5,
            };
            this.onRegionChange(region, region.latitude, region.longitude);
          }}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title="Lokasi"
            description="Hello"
          />
        </MapView>

        <GooglePlacesAutocomplete
          minLength={2}
          autoFocus={false}
          autoCorrect={false}
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            console.log(
              details.geometry.location.lat,
              details.geometry.location.lng,
            );

            const region = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.00922 * 1.5,
              longitudeDelta: 0.00421 * 1.5,
            };
            this.onRegionChange(region, region.latitude, region.longitude);
          }}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyArDIY6FvsjSEQtyTAPCs8k8d2PlAqLxNw',
            language: 'en',
            types: 'geocode',
          }}
          debounce={200}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#000',
            },
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              top: 15,
              width: screenWidth - 10,
              borderWidth: 0,
            },
            listView: {
              backgroundColor: 'rgba(192,192,192,0.9)',
              top: 23,
            },
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
});
