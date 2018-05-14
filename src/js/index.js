import React, { Component } from 'react';
import {ActivityIndicator, Text, StyleSheet, View, Dimensions, StatusBar, Platform, Image, AsyncStorage } from 'react-native';
import Parent from './components/Parent.js';


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        loaded: false,
        buttons: [],
        agenda: [],
        dataLoad: true,
        menu: {}
      };
      this.getKey();
      this.fetchMenu();
      this.fetchData();
   }

   



  render() {
    return (
      <Parent/>
    );
  }
}


export default App;