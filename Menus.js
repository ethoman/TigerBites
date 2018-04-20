import React, { Component } from 'react';
import {ActivityIndicator, Alert, Text, View, List, ListItem, Button, StyleSheet, Dimensions, StatusBar, Platform, Image, ScrollView, ListView, TouchableOpacity, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';

class Menu extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'Dining Hall Menu',
        headerTitle: 'My Favorite Foods',
    };
  render () {
    return(
        <ScrollView>
        <Text>{JSON.stringify(this.props)}</Text>
        </ScrollView>
    );
}
}

const Menus = TabNavigator({
  Butler: {
    screen: props=> <Menu {...props.screenProps.menu['Wu / Wilcox']}/>
  },
  CJL: {
    screen: props=> <Menu {...props.screenProps.menu.CJL}/>
  },
  Whitman: {
    screen: props=> <Menu {...props.screenProps.menu.Whitman}/>
  },
  RoMa: {
    screen: props=> <Menu {...props.screenProps.menu['Ro / Ma']}/>
  },
  Forbes: {
    screen: props=> <Menu {...props.screenProps.menu.Forbes}/>
  },
  Grad: {
    screen: props=> <Menu {...props.screenProps.menu.Grad}/>
  },
},
  
{
  title: 'Scheduler',
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
      showIcon: false,
      activeTintColor: 'blue',
      inactiveTintColor:'gray',
      style:{
        padding: 0,
        margin: 0,
        backgroundColor: 'white',
      },
  tabStyle: {
    padding: 0,
    margin: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
   labelStyle: {
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 5,
      textAlignVertical: 'center'
   },
  indicatorStyle: {
      backgroundColor: 'white'
  }  
}
});

export default Menus;