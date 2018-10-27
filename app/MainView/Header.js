import React, { Component } from "react";
import { Text, View, TextInput, Button, AsyncStorage } from "react-native";
import styled from "styled-components/native";

export default class Header extends Component {
  render() {
    console.log("HERE ARE THE PROPS", this.props);
    return (
      <View>
        <Button title="HUEHUEHUE" />
      </View>
    );
  }
}
