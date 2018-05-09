import React, { Component } from 'react';
import {ActivityIndicator, Alert, Text, View, List, ListItem, Button, StyleSheet, Dimensions, StatusBar, Platform, Image, ScrollView, ListView, TouchableOpacity, AsyncStorage, FlatList} from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';

class Menu extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'Dining Hall Menu',
        headerTitle: 'My Favorite Foods',
    };

  
  
  notEmpty(array) {
    if (array === undefined) return false;
    else return true;
  }

  renderCategories(array) {
    if (array === undefined) return;
    else return array.map(item => <Text key={item}>{item}</Text>);
  }

  renderMenu(array, tag) 
  {
    if (this.notEmpty(array)) 
      return (
        <View>
          <Text style={styles.category}>{tag}</Text>
          {this.renderCategories(array)}
        </View>
        );

    else return;
  }
  render () {
    return(

        <ScrollView>

        {this.renderMenu(this.props['-- Main Entree --'], <Text>Main Entrée</Text>)}
        {this.renderMenu(this.props['-- Entrees --'], <Text>Entrées</Text>)}
        {this.renderMenu(this.props['-- Vegetarian & Vegan Entree --'], <Text>Vegetarian & Vegan Entrée</Text>)}
        {this.renderMenu(this.props['-- On the Side --'], <Text>Sides</Text>)}
        {this.renderMenu(this.props['-- Soups --'], <Text>Soup</Text>)}
        {this.renderMenu(this.props['-- Grill --'], <Text>Grill</Text>)}
        {this.renderMenu(this.props['-- Soup of the Day --'], <Text>Soup</Text>)}
        {this.renderMenu(this.props['-- Action Station --'], <Text>Action Station</Text>)}
        {this.renderMenu(this.props['-- Entree Salad --'], <Text>Entrée Salad</Text>)}
        {this.renderMenu(this.props['-- Salads --'], <Text>Salad</Text>)}
        {this.renderMenu(this.props['-- Starches --'], <Text>Starches</Text>)}
        {this.renderMenu(this.props['-- Sandwiches --'], <Text>Sandwiches</Text>)}
        {this.renderMenu(this.props['-- From our Bakeshop --'], <Text>From our Bakeshop</Text>)}
        {this.renderMenu(this.props['-- Euro Special --'], <Text>Euro Special</Text>)}
        {this.renderMenu(this.props['-- Grill Special --'], <Text>Grill Special</Text>)}
        {this.renderMenu(this.props['-- Specialty Bars --'], <Text>Specialty Bars</Text>)}
        {this.renderMenu(this.props['-- Breakfast Bars --'], <Text>Breakfast Bars</Text>)}
        {this.renderMenu(this.props['-- Desserts --'], <Text>Desserts</Text>)}

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


const styles = StyleSheet.create({
  category : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'lightgray',
    textAlign: 'center'
  }


});

export default Menus;