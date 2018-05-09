import React, { Component } from 'react';
import {Dimensions,Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions} from 'react-navigation';
import Data from './Data.js'

class MyHomeScreen extends Component {
static navigationOptions = {
    tabBarLabel: 'Home',
    title: 'TigerBites',
  };

  render() {
    return (
      <View>
      
    <Image source={require('./TigerBites.jpg')} style={styles.image}/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
});

export default MyHomeScreen;