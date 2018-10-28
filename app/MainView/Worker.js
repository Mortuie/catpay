import React, { Component } from "react";
import { Text, View, TextInput, Button, AsyncStorage } from "react-native";
import styled from "styled-components/native";
import WorkView from "./WorkView";
import { MA_REMOTE_SERVER } from "../Constants";

export default class Worker extends Component {
  state = {
    interval: null,
    username: "",
    displayedStories: []
  };

  componentDidMount = async () => {
    const user = await AsyncStorage.getItem("user");
    const username = JSON.parse(user).username;

    this.setState({ username }, this.settingInterval);
  };

  settingInterval() {
    this.setState({ interval: setInterval(this.getAntraege, 500) });
  }

  getAntraege = () => {
    fetch(
      MA_REMOTE_SERVER + "/v1/api/getAuftraege?userId=" + this.state.username
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          displayedStories: res
        });
      })
      .catch(err => console.log(err));
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <View>
        {this.state.displayedStories &&
          this.state.displayedStories.map(item => (
            <WorkView
              thema={item.thema}
              id={item.auftragid}
              key={item.auftragid}
              repeat={item.wiederholung}
              top={item.anzahlbezverfuegbar}
            />
          ))}
      </View>
    );
  }
}
