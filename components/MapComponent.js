import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
        latitude: 17.428597,
        longitude: 78.4540205,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      hasLocationPermissions: false,
      locationResult: null,
      markers: [
        {
          latitude: 17.4506993,
          longitude: 78.4450066,
          title: "Deepak",
        },
        {
          latitude: 17.4092188,
          longitude: 78.4705727,
          title: "Shiva",
        },
        {
          latitude: 17.4092188,
          longitude: 78.4505727,
          title: "Preeti",
          subtitle: "1234 Foo Drive",
        },
        {
          latitude: 17.428597,
          longitude: 78.4540205,
          title: "You",
          subtitle: "1234 Foo Drive",
        },
        {
          latitude: 17.4379878,
          longitude: 78.4643099,
          title: "Shetty",
          subtitle: "1234 Foo Drive",
        },
      ],
    };
  }

  componentDidMount() {
    //this.getLocationAsync();
  }

  handleMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion });
  };

  async getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      this.setState({ hasLocationPermissions: true });
      //  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location) });
      // Center the map on the location we just fetched.
      this.setState({
        mapRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    } else {
      alert("Location permission not granted");
    }
  }
  _calloutPress(index) {
    console.log("calloutPress!" + index);
    this.props.navigation.navigate("ChatComponent", {
      data: index,
    });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="light-content" />

        <MapView style={styles.map} region={this.state.mapRegion}>
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            >
              <Callout
                onPress={() => this._calloutPress(marker.title)}
              ></Callout>
            </Marker>
          ))}
        </MapView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  plot: {
    fontSize: 10,
    alignSelf: "flex-start",
    color: "black",
    padding: 5,
  },
});
