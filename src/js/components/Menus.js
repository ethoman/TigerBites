import React, { Component } from 'react';
import {ActivityIndicator, AsyncStorage, Text, View, List, ListItem, Button, StyleSheet, Dimensions, StatusBar, Platform, Image, ScrollView, ListView, TouchableOpacity, FlatList} from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';
import { connect } from "react-redux";
import { toggleTodo } from '../actions/index.js';
import Events from './events.js';
import { Notifications, Permissions } from 'expo';


const mapStateToProps = (state) => {
  return { articles: state };
};

class Menu extends React.Component {
  
  picture(name) {
    var picture;
    const itemData = name.toUpperCase();
    const meat = 'Meat'.toUpperCase();
    const vegan = 'vegan'.toUpperCase();
    const vegetarian = 'vegetarian'.toUpperCase();
    const sides = 'side'.toUpperCase();
    const salad = 'salad'.toUpperCase();
    const soup = 'soup'.toUpperCase();
    const entree = 'entree'.toUpperCase();
    if(itemData.indexOf(meat) > -1)
      picture = require('./meat.jpeg');

    else if(itemData.indexOf(vegan) > -1)
      picture = require('./vegan.jpg');

    else if(itemData.indexOf(vegetarian) > -1)
      picture = require('./vegetarian.jpg');

    else if(itemData.indexOf(salad) > -1)
      picture = require('./salad.jpg');

    else if(itemData.indexOf(sides) > -1)
      picture = require('./sides.jpg');

    else if(itemData.indexOf(soup) > -1)
      picture = require('./soup.jpg');

    else if(itemData.indexOf(entree) > -1)
      picture = require('./entree.jpg');

    return picture;
  }
  
  notEmpty(array) {
    if (array === undefined) return false;
    else return true;
  }

  renderCategories(array) {
    if (array === undefined) return;
    else return Object.values(array).map(item => 
      {
        var picture = this.picture(this.props.articles.todos[item].type);
        return <Events pic={picture} key={item} rowData={this.props.articles.todos[item]}/>
      });
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
        <View style={{position: 'absolute', top: 20, left: 0, right: 0, bottom: 0, alignItems: 'center'}}>
        <Text>No Food to Display!</Text>
        </View>
        {this.renderMenu(this.props['-- Main Entree --'], <Text>Main Entrée</Text>)}
        {this.renderMenu(this.props['-- Entrees --'], <Text>Entrées</Text>)}
        {this.renderMenu(this.props['-- Vegetarian & Vegan Entree --'], <Text>Vegetarian & Vegan Entrée</Text>)}
        {this.renderMenu(this.props['-- On the Side --'], <Text>Sides</Text>)}
        {this.renderMenu(this.props['-- Soups --'], <Text>Soup</Text>)}
        {this.renderMenu(this.props['-- Grill --'], <Text>Grill</Text>)}
        {this.renderMenu(this.props['-- Soup of the Day --'], <Text>Soup</Text>)}
        {this.renderMenu(this.props['-- Action Station --'], <Text>Action Station</Text>)}
        {this.renderMenu(this.props['-- Entree Salad --'], <Text>Entrée Salad</Text>)}
        {this.renderMenu(this.props['-- Entree Salads --'], <Text>Entrée Salads</Text>)}
        {this.renderMenu(this.props['-- Salads --'], <Text>Salad</Text>)}
        {this.renderMenu(this.props['-- Pasta Station --'], <Text>Pasta Station</Text>)}
        {this.renderMenu(this.props['-- Fruit --'], <Text>Fruit</Text>)}
        {this.renderMenu(this.props['-- Vegan Salads --'], <Text>Vegan Salads</Text>)}
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


const styles = StyleSheet.create({
  category : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'lightgray',
    textAlign: 'center'
  },
});

export default connect(mapStateToProps)(Menu);


