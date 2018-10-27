import React, { Component } from "react";
import { Text, View, TextInput, Button, AsyncStorage } from "react-native";
import styled from "styled-components/native";

type Props = {};
export default class Header extends Component<Props> {
  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 10,
            paddingLeft: 6
          }}
        >
          <Text
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Burger
          </Text>
          <Text
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Catpay
          </Text>
        </View>
      </View>
    );
  }
}
