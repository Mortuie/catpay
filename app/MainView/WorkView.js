import React, { Component } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import styled from "styled-components/native";
import NfcManager, { Ndef } from "react-native-nfc-manager";
import { ToastAndroid } from "react-native";
import { MA_REMOTE_SERVER } from "../Constants";

const Container = styled.View`
  height: 30px;
  background-color: #d6d6d6;
  margin-top: 10px;
`;

const StyledText = styled.Text`
  font-size: 20px;
`;

export default class WorkView extends Component {
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

  sendRequest = () => {
    console.log("WE ARE NOW SENDING THE REQUEST...");
    fetch(MA_REMOTE_SERVER + "/v1/api/createZahlung?auftragid=" + this.props.id)
      .then(res => {
        if (res.ok) {
          ToastAndroid.show("Payment has been initiated.", ToastAndroid.SHORT);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <StyledText
          onPress={() =>
            Alert.alert(
              "Authorise your payment",
              "Get ready to touch your phone to the RFID.",
              [
                {
                  text: "Start Scanning",
                  onPress: this._startDetection
                }
              ]
            )
          }
        >
          Thema: {this.props.thema} {this.props.repeat}/{this.props.top}
        </StyledText>
      </Container>
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
    this.sendRequest();
    ToastAndroid.show("RFID Chip has been read.", ToastAndroid.SHORT);
    this._stopDetection();
    this.setState({ parsedText: text });
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
