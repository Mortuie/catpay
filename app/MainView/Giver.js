import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import styled from "styled-components/native";

type Props = {};
export default class Giver extends Component<Props> {
  state = {
    thema: "",
    besch: "",
    lohn: "",
    wieder: "",
    beitrag: "",
    target: ""
  };

  render() {
    return (
      <View>
        <TextInput
          value={this.state.thema}
          onChangeText={text => this.setState({ thema: text })}
          placeholder={"Thema"}
        />
        <TextInput
          value={this.state.besch}
          onChangeText={text => this.setState({ besch: text })}
          placeholder={"Beschreibung"}
        />
        <TextInput
          value={this.state.lohn}
          onChangeText={text => this.setState({ lohn: text })}
          placeholder={"Lohn"}
        />
        <TextInput
          value={this.state.wieder}
          onChangeText={text => this.setState({ wieder: text })}
          placeholder={"Wiederholen"}
        />
        <TextInput
          value={this.state.beitrag}
          onChangeText={text => this.setState({ Beitrag: text })}
          placeholder={"Beitrag"}
        />
        <TextInput
          value={this.state.target}
          onChangeText={text => this.setState({ target: text })}
          placeholder={"Ziel"}
        />
        <Button title="Senden" />
      </View>
    );
  }
}
