import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

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
          description: "Click to chat",
        },
        {
          latitude: 17.4092188,
          longitude: 78.4705727,
          title: "Shiva",
          description: "Click to chat",
        },
        {
          latitude: 17.4092188,
          longitude: 78.4505727,
          title: "Preeti",
          description: "Click to chat",
        },
        {
          latitude: 17.428597,
          longitude: 78.4540205,
          title: "You",
        },
        {
          latitude: 17.4379878,
          longitude: 78.4643099,
          title: "Shetty",
          description: "Click to chat",
        },
      ],
    };
  }

  //to add user of datatype marker
  _addUser = (marker) => {
    this.setState((previousState) => ({
      markers: [...previousState.marker, marker],
    }));
  };

  //called on marker title click
  _calloutPress(data) {
    if (data !== "You") {
      this.props.navigation.navigate("ChatComponent", {
        data: data,
      });
    }
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
              <MaterialIcons name="person-pin-circle" size={40} color="red" />
              <Callout
                onPress={() => this._calloutPress(marker.title)}
              ></Callout>
            </Marker>
          ))}
        </MapView>
      </SafeAreaView>
    );
  }

  //  _getMarkersInRange=(range)=>{
  //code to filter list of markers within a given range. Probably gonna use directions API.
  //  }

  // componentDidMount() {
  //   this._getLocationAsync();
  // }

  // async _getLocationAsync() {
  //   // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
  //   const { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status === "granted") {
  //     this.setState({ hasLocationPermissions: true });
  //     //  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  //     const location = await Location.getCurrentPositionAsync({});
  //     this.setState({ locationResult: JSON.stringify(location) });
  //     // Center the map on the location we just fetched.
  //     this.setState({
  //       mapRegion: {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       },
  //     });
  //   } else {
  //     alert("Location permission not granted");
  //   }
  // }
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
