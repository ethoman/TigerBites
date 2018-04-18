import React, { Component } from 'react';
import {ActivityIndicator, Alert, Text, View, List, ListItem, Button, StyleSheet, Dimensions, StatusBar, Platform, Image, ScrollView, ListView, TouchableOpacity, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';
import MyHomeScreen from './MyHomeScreen.js';
import ContactUs from './ContactUs.js';
import Schedule from './Schedule.js';
import MyAgenda from './MyAgenda.js';
import Menus from './Menus.js';
import { Icon } from 'react-native-elements';

var url = 'https://vast-chamber-81818.herokuapp.com/food/all/';
var menuURL = 'https://vast-chamber-81818.herokuapp.com/food/today/';

class Scheduler extends React.Component {
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

   async getKey() {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value == null) {
        let error = new Error();
        throw error;
      }
      this.setState({agenda: JSON.parse(value)});
    } catch (error) {
      this.setState({dataLoad: false});
    }

  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
    } catch (error) {
      //console.log("Error saving data" + error);
    }
  }

  fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
          var length = responseData.length;
          var buttons = [];
          if(this.state.dataLoad==false) {
            var temp = [];
            for(var i = 0; i< length; i++) {
              temp.push(false);
            }
            this.setState({agenda: temp});
          }
          //console.log(JSON.stringify(this.state.agenda));
          for (var i = 0; i < length; i++) {
              buttons.push({
                    ...responseData[i],
                  row: i,
                  button: this.state.agenda[i],
              });
              //console.log(this.state.agenda[i]);
          }
        this.wait(2000);
        this.setState({
          loaded: true,
          buttons,
          currentScreen: 'Home',
        });
      })
      .done();
  }

  fetchMenu() {
    fetch(menuURL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          menu: responseData
        });
      })
      .done();
  }

  wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

  onChildChanged(newState, rowID, Screen){
    var dataClone = this.state.buttons;
    dataClone[rowID].button = newState;
    var agenda = [];
    for (var i = 0; i < this.state.buttons.length; i++) {
      var toPush = this.state.buttons[i].button;
      if(toPush == null)
        toPush = false;
      agenda.push(toPush);
    }
    this.setState({
      buttons: dataClone,
      currentScreen: Screen,
      agenda: agenda
    });
    this.saveKey(JSON.stringify(agenda));
  }


  render() {

      if (this.state.loaded == false) {
          return (
            <View style={[styles.container, styles.horizontal]}>
                <Image source={require('./TigerBites.jpg')} style={styles.image} />
               <ActivityIndicator style={{alignItems: 'center'}} size="large" color="#00ff00" />
            </View>
            );
      }
      
    return (
      <AppNavigator screenProps={{ initialState:this.state.buttons, callbackParent:(newState, rowID, Screen) => this.onChildChanged(newState, rowID, Screen), menu:this.state.menu}} />
    );
  }
}


const SimpleTabs = TabNavigator({
  Scheduler: {
    screen: Schedule
  },
  MySchedule: {
    screen: MyAgenda
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




const MyApp = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Menu: {
    screen: Menus,
  },
  Food: {
    screen: SimpleTabs,
  },
  ContactUs: {
    screen: ContactUs,
  },
  },
);

const MenuButton = (props) => {
  return (
  <View>
    <TouchableOpacity onPress={() => {props.navigation.navigate('DrawerToggle')}} style={{marginLeft:10}}>
      <Icon name="bars" color="black" type={"font-awesome"}/>
    </TouchableOpacity>
  </View>
  );
};

const AppNavigator = new StackNavigator({
  Main: {
    screen: MyApp,
    navigationOptions: ({ navigation }) => (
      {headerLeft : <MenuButton navigation={navigation} />,
  }),
  },
},
);

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    justifyContent: 'center',
    width: 160,
    height: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default Scheduler;
