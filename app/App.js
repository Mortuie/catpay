/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import NFC from "./NFC";
import styled from "styled-components/native";
import { Register } from "./User";
import { Header, Giver, Worker } from "./MainView";
import { createStackNavigator } from "react-navigation";

const MainContainer = styled.View`
  background-color: #f5fcff;
`;

// export default class App extends Component {
//   render() {
//     return <MainComponent />;
//   }
// }

export default createStackNavigator(
  {
    Register: {
      screen: Register
    },
    Giver: {
      screen: Giver
    },
    Worker: {
      screen: Worker
    }
  },
  {
    initialRouteName: "Register"
  }
);
