import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import NfcManager, { Ndef } from "react-native-nfc-manager";

type Props = {};
export default class Account extends Component<Props> {
  state = {
    supported: false
  };

  componentDidMount;

  render() {
    return <div />;
  }
}
