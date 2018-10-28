import React, { Component } from "react";
import { Text, View, TextInput, Button, AsyncStorage } from "react-native";
import styled from "styled-components/native";
import { ToastAndroid } from "react-native";
import { MA_REMOTE_SERVER } from "../Constants";

export default class Giver extends Component {
  static navigationOptions = {
    drawerLabel: "Giver"
  };

  state = {
    thema: "",
    beschreibung: "",
    wiederholung: "",
    betrag: "",
    auftragnehmer: "",
    username: ""
  };

  createBetrag() {
    const data = {
      thema: this.state.thema,
      beschreibung: this.state.beschreibung,
      wiederholung: this.state.wiederholung,
      betrag: this.state.betrag,
      auftragnehmer: this.state.auftragnehmer,
      person: this.state.username
    };

    fetch(MA_REMOTE_SERVER + "/v1/api/createAuftrag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          ToastAndroid.show("Task has been created.", ToastAndroid.SHORT);
          this.setState({
            thema: "",
            beschreibung: "",
            wiederholung: "",
            betrag: "",
            auftragnehmer: "",
            username: ""
          });
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount = async () => {
    const test = await AsyncStorage.getItem("user");
    const js = JSON.parse(test).username;
    this.setState({ username: js });
  };

  render() {
    console.log(this.state);
    return (
      <View>
        <TextInput
          value={this.state.thema}
          onChangeText={text => this.setState({ thema: text })}
          placeholder={"Thema"}
        />
        <TextInput
          value={this.state.beschreibung}
          onChangeText={text => this.setState({ beschreibung: text })}
          placeholder={"Beschreibung"}
        />
        <TextInput
          value={this.state.wiederholung}
          onChangeText={text => this.setState({ wiederholung: text })}
          placeholder={"Wiederholen"}
        />
        <TextInput
          value={this.state.betrag}
          onChangeText={text => this.setState({ betrag: text })}
          placeholder={"Betrag"}
        />
        <TextInput
          value={this.state.auftragnehmer}
          onChangeText={text => this.setState({ auftragnehmer: text })}
          placeholder={"Auftragnehmer"}
        />
        <Button title="Senden" onPress={() => this.createBetrag()} />
      </View>
    );
  }
}
