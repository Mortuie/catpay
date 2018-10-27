/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import NFC from "./NFC";
import styled from "styled-components/native";
import { Register } from "./User";
import { Header, Giver, Worker } from "./MainView";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

const App2 = createDrawerNavigator(
  {
    Giver: {
      screen: Giver
    },
    Worker: {
      screen: Worker
    }
  },
  {
    initialRouteName: "Giver"
  }
);

const App = createStackNavigator(
  {
    App: App2
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Button onPress={() => navigation.toggleDrawer()} title="=" />
    })
  }
);

const Auth = createStackNavigator(
  {
    Register: {
      screen: Register
    }
  },
  {
    initialRouteName: "Register"
  }
);

export default createSwitchNavigator(
  {
    Auth: Auth,
    App: App
  },
  {
    initialRouteName: "Auth"
  }
);
