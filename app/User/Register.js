import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  Alert
} from "react-native";
import styled from "styled-components/native";
import NfcManager, { Ndef } from "react-native-nfc-manager";
import { ToastAndroid } from "react-native";

export default class Register extends Component {
  static navigationOptions = { title: "Welcome", header: null };

  state = {
    username: "",
    telephone: "",
    iban: "",
    rfid: -1
  };

  persistData = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(this.state));
      console.log(await AsyncStorage.getItem("user"));
      this.props.navigation.navigate("App");
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    NfcManager.isSupported().then(supported => {
      this.setState({ supported });
      console.log("It's supported!");
      if (supported) {
        this._startNfc();
      }
    });
  }

  componentWillUnmount() {
    if (this._stateChangedSubscription) {
      this._stateChangedSubscription.remove();
    }
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <TextInput
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
          placeholder={"Username"}
        />
        <Button title="Register" onPress={this.persistData} />
      </View>
    );
  }

  _startNfc() {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.log("ios session closed");
      }
    })
      .then(result => {
        console.log("start OK", result);
      })
      .catch(error => {
        console.warn("start fail", error);
        this.setState({ supported: false });
      });

    if (Platform.OS === "android") {
      NfcManager.getLaunchTagEvent()
        .then(tag => {
          console.log("launch tag", tag);
          if (tag) {
            this.setState({ tag });
          }
          1997;
        })
        .catch(err => {
          console.log(err);
        });
      NfcManager.isEnabled()
        .then(enabled => {
          this.setState({ enabled });
        })
        .catch(err => {
          console.log(err);
        });
      NfcManager.onStateChanged(event => {
        if (event.state === "on") {
          this.setState({ enabled: true });
        } else if (event.state === "off") {
          this.setState({ enabled: false });
        } else if (event.state === "turning_on") {
          // do whatever you want
        } else if (event.state === "turning_off") {
          // do whatever you want
        }
      })
        .then(sub => {
          this._stateChangedSubscription = sub;
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }

  _onTagDiscovered = tag => {
    console.log("Tag Discovered", tag);
    this.setState({ tag });
    let url = this._parseUri(tag);
    if (url) {
      Linking.openURL(url).catch(err => {
        console.warn(err);
      });
    }

    let text = this._parseText(tag);
    console.log("TEXT: ", parseInt(text));
    ToastAndroid.show("RFID has been read.", ToastAndroid.SHORT);
    this._stopDetection();
    this.setState({ rfid: parseInt(text) });
  };

  _startDetection = () => {
    NfcManager.registerTagEvent(this._onTagDiscovered)
      .then(result => {
        console.log("registerTagEvent OK", result);
      })
      .catch(error => {
        console.warn("registerTagEvent fail", error);
      });
  };

  _stopDetection = () => {
    NfcManager.unregisterTagEvent()
      .then(result => {
        console.log("unregisterTagEvent OK", result);
      })
      .catch(error => {
        console.warn("unregisterTagEvent fail", error);
      });
  };

  _parseText = tag => {
    try {
      if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
        return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  _parseUri = tag => {
    try {
      if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
        return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };
}
