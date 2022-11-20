import React, { Component } from "react";

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: this.props.route.params.data,
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.image}
          source={{
            uri: this.state.pageData.Poster,
          }}
          resizeMode="cover"
        />
        <ScrollView style={styles.floater}>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <Text style={styles.title}>
              {this.state.pageData.Title} ({this.state.pageData.Year})
            </Text>
            <Text style={styles.plot}>{this.state.pageData.Plot}</Text>
            <Text style={styles.plot}>
              Cast{"\n"}
              {this.state.pageData.Actors}
            </Text>
            <Text style={styles.plot}>
              Duration{"\n"}
              {this.state.pageData.Runtime}
            </Text>
            <Text style={styles.plot}>
              Genre{"\n"}
              {this.state.pageData.Genre}
            </Text>
            <Text style={styles.plot}>
              Released{"\n"}
              {this.state.pageData.Released}
            </Text>
            {this.state.pageData.Ratings.length === 3 ? (
              <View style={styles.rowContainer}>
                <Text style={styles.title}>{this.state.pageData.Rated}</Text>
                <Text style={styles.plot}>
                  {this.state.pageData.Ratings[0].Value}
                  {"\n "}IMDB
                </Text>
                <Text style={styles.plot}>
                  {"            "}
                  {this.state.pageData.Ratings[1].Value}
                  {"\n"}Rotten Tomatoes
                </Text>
                <Text style={styles.plot}>
                  {"  "}
                  {this.state.pageData.Ratings[2].Value}
                  {"\n"}Metacritic
                </Text>
              </View>
            ) : (
              <View style={styles.rowContainer}>
                <Text style={styles.title}>{this.state.pageData.Rated}</Text>
                <Text style={styles.plot}>
                  {" "}
                  {this.state.pageData.imdbRating}
                  {"\n"}IMDB
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: wp("5%"),
    alignSelf: "flex-start",
    color: "black",
    padding: 5,
    fontWeight: "bold",
  },
  plot: {
    fontSize: wp("3.5%"),
    alignSelf: "flex-start",
    color: "black",
    padding: 5,
  },
  image: {
    width: wp("100%"),
    height: hp("50%"),
  },
  floater: { flex: 1, position: "absolute", paddingTop: hp("50%") },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderColor: "#BDBDBD",
    borderWidth: 0.7,
    padding: 5,
  },
});
