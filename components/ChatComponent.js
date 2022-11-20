import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
} from "react-native";

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
    );
  }
}
