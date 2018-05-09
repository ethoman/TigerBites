import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js';
import MyHomeScreen from './MyHomeScreen.js';


class Schedule extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Foods',
        headerTitle: 'Set Favorite Foods',
    };

  render() {
    return (
    <View  style={styles.container}>

    <Data personalSchedule = {1} />

    
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between' 
  },
  home: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
});

export default Schedule;
