import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js';
import MyHomeScreen from './MyHomeScreen.js';

class MyAgenda extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'My Favorite Foods',
        headerTitle: 'My Favorite Foods',
    };

  render() {
    
    return (
    <View  style={styles.container}>
      <View style={styles.noEventsView}>
        <Text style={styles.noEvents}>
          No Foods Selected! Tap Food To Add Reminders and Never Miss Whitman Chicken Pot Pie Again! 
        </Text>
      </View>

      <Data personalSchedule = {0}/>
        

      
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
  noEvents: {
    color: '#A5A5A5',
    fontSize: 12,
    position: 'absolute',
    paddingTop: 10
  },
  noEventsView:{
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: .2,
    alignItems: 'center'
  }
});

export default MyAgenda;
