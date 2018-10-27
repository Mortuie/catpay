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

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <MainContainer>
        <Register />
      </MainContainer>
    );
  }
}
