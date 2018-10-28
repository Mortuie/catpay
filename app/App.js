/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Button } from "react-native";
import styled from "styled-components/native";
import { Register } from "./User";
import { Header, Giver, Worker } from "./MainView";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
console.disableYellowBox = true;

const Drawer = styled.Button`
  margin-left: 50px;
`;

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
      headerLeft: <Drawer onPress={() => navigation.toggleDrawer()} title="=" />
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
