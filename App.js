import React from "react";
import { Provider } from "react-redux";
import store from "./src/js/store/index.js";
import Parent from "./src/js/components/Parent.js";
import { addTodo } from './src/js/actions/index.js'
import { Icon } from 'react-native-elements';
import {ActivityIndicator, Text, StyleSheet, View, Dimensions, StatusBar, Platform, Image, AsyncStorage } from 'react-native';


var url = 'https://vast-chamber-81818.herokuapp.com/food/all/';
var menuURL = 'https://vast-chamber-81818.herokuapp.com/food/today/';

class AppSource extends React.Component {

  constructor() {
      super();
      this.state = {
        loaded: false,
        agenda: {},
        dataLoad: true,
        menu: {}
      };
      this.fetchMenu();
      this.fetchData();
   }

   async getKey(name) {
    try {
      const value = await AsyncStorage.getItem(name);
      var agendaClone = this.state.agenda;
      if (value == null || value == undefined) {
            agendaClone[name] = false;
        }
        else 
            agendaClone[name] = JSON.parse(value); 
      this.setState({agenda:agendaClone});
      return value;
    } catch (error) {
      console.log(error);
    }

  }

  async fetchData() {
    const res = await fetch(url)
    const responseData = await res.json()
          var length = responseData.length;
          var buttons = [];
          for (var i = 0; i < length; i++) {
              await this.getKey(responseData[i].item_name);
              buttons.push({
                    ...responseData[i],
                  row: i,
                  button: this.state.agenda[responseData[i].item_name],
              });
              store.dispatch(addTodo(buttons[i]));
            }
        this.wait(2000);
        this.setState({
          loaded: true,
        });
  }

  fetchMenu() {
    fetch(menuURL)
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData);
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

render() {
      if (this.state.loaded == false) {
        return (
          <View style={[styles.container, styles.horizontal]}>
              <Image source={require('./src/js/components/TigerBites.jpg')} style={styles.image} />
             <ActivityIndicator style={{alignItems: 'center'}} size="large" color="#00ff00" />
          </View>
          );
    }
 else return (
  <Provider store={store}>
    <Parent menu={this.state.menu}/>
  </Provider>
  );
}
}

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
export default AppSource;
