import React, { Component } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const axios = require("axios").default;

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
      searchQuery: "Marvel",
    };
  }

  componentDidMount() {
    this._getSearchResults();
  }

  _getSearchResults = () => {
    axios
      .get(
        "http://www.omdbapi.com/?apikey=b9bd48a6&s=" + this.state.searchQuery
      )
      .then(
        function (response) {
          console.log(response.data.Search);
          this.setState({ searchResults: response.data.Search });
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  _getDetails = (id) => {
    console.log("==" + id);
    axios
      .get("http://www.omdbapi.com/?apikey=b9bd48a6&i=" + id)
      .then(
        function (response) {
          console.log(response.data);
          this.props.navigation.navigate("DetailsPage", {
            data: response.data,
          });
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, margin: 15 }}>
        <StatusBar barStyle="light-content" />
        <TextInput
          style={styles.textInput}
          returnKeyType="done"
          onSubmitEditing={() => {
            this._getSearchResults();
          }}
          value={this.state.searchQuery}
          onChangeText={(name) => this.setState({ searchQuery: name })}
        />
        <ScrollView>
          <View style={styles.container}>
            {this.state.searchResults &&
              this.state.searchResults.map((item) => (
                <TouchableOpacity
                  key={nanoid(5)}
                  onPress={() => this._getDetails(item.imdbID)}
                >
                  <View style={styles.item}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.Poster,
                      }}
                    />
                    <Text style={styles.title}>{item.Title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#BDBDBD",
    width: wp("45%"),
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: wp("3%"),
    alignSelf: "flex-start",
    color: "black",
    padding: 5,
  },
  textInput: {
    width: "100%",
    height: 50,
    borderColor: "#BDBDBD",
    borderWidth: 0.7,
    marginBottom: 10,
    padding: 5,
    fontSize: 18,
  },
  image: {
    width: wp("45%"),
    height: hp("30%"),
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
