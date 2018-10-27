import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import styled from "styled-components/native";
import WorkView from "./WorkView";

export default class Worker extends Component {
  state = {};

  render() {
    return (
      <View>
        <WorkView />
        <WorkView />
        <WorkView />
        <WorkView />
        <WorkView />
        <WorkView />
        <WorkView />
        <WorkView />
      </View>
    );
  }
}
