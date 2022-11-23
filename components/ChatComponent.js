import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.route.params.data,
      replyMessage: "",
      chatHistory: [],
    };
  }

  //on message send key press
  _onSendPress = () => {
    var tempChat = this.state.chatHistory;
    tempChat.push({ type: "to", message: this.state.replyMessage });
    this.setState({
      chatHistory: tempChat,
    });
    this.textInput.clear();
  };

  //on receive message from user via FCM or any other channel
  _onMessageReceive = (message) => {
    var tempChat = this.state.chatHistory;
    tempChat.push({ type: "from", message: message });
    this.setState({
      chatHistory: tempChat,
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.title}>{this.state.userName}</Text>
        </View>
        <Text style={styles.subTitle}>Say Hi!</Text>
        <KeyboardAwareScrollView>
          <View style={styles.chatWindow}>
            {this.state.chatHistory &&
              this.state.chatHistory.map((item, index) => (
                <View key={index}>
                  {item.type === "to" ? (
                    <Text style={styles.chatItemTo}>{item.message}</Text>
                  ) : (
                    <Text style={styles.chatItemFrom}>{item.message}</Text>
                  )}
                </View>
              ))}
          </View>
          <View style={styles.footer}>
            <TextInput
              ref={(input) => {
                this.textInput = input;
              }}
              style={styles.chatInput}
              placeholder="Type Message ....."
              returnKeyLabel={"done"}
              onChangeText={(text) => this.setState({ replyMessage: text })}
            />
            <Ionicons
              name="md-send"
              size={30}
              color="#0af"
              style={{ alignSelf: "center", margin: 5 }}
              onPress={() => this._onSendPress()}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: wp("5%"),
    alignSelf: "center",
    color: "black",
    marginTop: hp("2%"),
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: wp("3%"),
    alignSelf: "center",
    color: "black",
    marginTop: wp("2%"),
  },
  chatItemTo: {
    fontSize: wp("5%"),
    alignSelf: "flex-end",
    color: "black",
    margin: hp("2%"),
    borderWidth: wp("0.2%"),
    borderColor: "#808080",
    borderRadius: wp("1%"),
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  chatItemFrom: {
    fontSize: wp("5%"),
    alignSelf: "flex-start",
    color: "black",
    margin: hp("2%"),
    borderWidth: wp("0.2%"),
    borderColor: "#808080",
    borderRadius: wp("1%"),
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  chatWindow: {
    height: hp("77%"),
  },
  chatInput: {
    width: wp("85%"),
    borderWidth: wp("0.2%"),
    borderColor: "#808080",
    borderRadius: wp("1%"),
    margin: 5,
    padding: 3,
  },
  header: {
    height: hp("7%"),
    alignContent: "center",
    borderBottomWidth: wp("0.2%"),
    borderBottomColor: "#808080",
  },
  footer: {
    flexDirection: "row",
    height: hp("7%"),
    borderTopWidth: wp("0.2%"),
    borderTopColor: "#808080",
  },
});
