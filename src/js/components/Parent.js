import React, { Component } from 'react';
import {ActivityIndicator, Alert, Text, View, List, ListItem, Button, StyleSheet, Dimensions, StatusBar, Platform, Image, ScrollView, ListView, TouchableOpacity, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';
import MyHomeScreen from './MyHomeScreen.js';
import ContactUs from './ContactUs.js';
import Schedule from './Schedule.js';
import MyAgenda from './MyAgenda.js';
import Profiles from './Profiles.js';
import Menu from './Menus.js';
import { Icon } from 'react-native-elements';



class Parent extends React.Component {
   //  constructor({menu}) {
   //    super();
   //    this.state = {
   //      //buttons: props.data,
   //      //agenda: props.agenda,
   //      menu: menu
   //    };
   //    console.log(this.state.menu)
   // }

   async resetKey() {
    try {
      await AsyncStorage.removeItem('@MySuperStore:key');
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({myKey: value});
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  onChildChanged(newState, rowID){
    //console.log('hi');
    var dataClone = this.state.buttons;
    dataClone[rowID].button = newState;
    var agendaClone = this.state.agenda;
    agendaClone[rowID].button = newState;
    this.setState({
      buttons: dataClone,
      agenda: agendaClone
    });
    this.saveKey(JSON.stringify(agendaClone));
  }
  


  render() {  
    return (
      <AppNavigator screenProps={{menu:this.props.menu}}/>
    );
  }
}



const SimpleTabs = TabNavigator({
  Scheduler: {
    screen: Schedule,
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
  tabBarPosition: Platform.OS === 'android' ? 'top' : 'bottom',
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
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 5,
      textAlignVertical: 'center'
   },
   
   navigationOptions: {
    headerMode: 'none',
   },
  indicatorStyle: {
      backgroundColor: 'white'
  }  
}
});


const Profiler = new StackNavigator({
  Foods: {
    screen: SimpleTabs,
  },
  Profile: {
    screen: Profiles,
  },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);


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
  navigationOptions:{
  headerTitle: 'Today\'s Menus',
  },
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

const theMenus = new StackNavigator({
  Menu: {
    screen: Menus,
  },
  Profile: {
    screen: Profiles,
  },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

const MyApp = DrawerNavigator({
  Main: {
    screen: MyHomeScreen,
  },
  Menu: {
    screen: theMenus,
  },
  Food: {
    screen: Profiler,
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
{ headerMode: 'screen' }
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

export default Parent;
