import React, { Component } from "react";
import { Text, View, TextInput, Button, AsyncStorage } from "react-native";
import styled from "styled-components/native";

type Props = {};
export default class Register extends Component<Props> {
  state = {
    username: "",
    telephone: "",
    iban: "",
    rfid: ""
  };

  persistData = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(this.state));
      console.log(await AsyncStorage.getItem("user"));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.props);
    return (
      <View>
        <TextInput
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
          placeholder={"Username"}
        />
        <TextInput
          value={this.state.telephone}
          onChangeText={text => this.setState({ telephone: text })}
          placeholder={"Telephone number"}
        />
        <TextInput
          value={this.state.iban}
          onChangeText={text => this.setState({ iban: text })}
          placeholder={"IBAN number"}
        />
        <TextInput
          value={this.state.rfid}
          onChangeText={text => this.setState({ rfid: text })}
          placeholder={"RFID"}
        />
        <Button title="Register" onPress={this.persistData} />
      </View>
    );
  }
}
