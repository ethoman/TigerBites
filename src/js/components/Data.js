import React, { Component } from 'react';
import {Text, View, Platform, Alert, AsyncStorage, Image, ScrollView, TextInput, StyleSheet, ListView, FlatList, TouchableHighlight } from 'react-native';
import Events from './events.js';
import { Constants, Notifications, Permissions } from 'expo';
import {StackNavigator, NavigationActions} from 'react-navigation';
import moment from 'moment';
import { connect } from "react-redux";
import { toggleTodo } from '../actions/index.js';
import {SearchBar} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';


async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}


const mapStateToProps = (state) => {
  return { articles: state };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id.key))
    }
  }
}

class Data extends React.Component {


constructor(props) {
 
    super(props);

    this.state = {
      text: '',
      dataSource: props.articles.todos,
      selection: 'All',
      picture: require('./filter.png')
    
    }
  }

  componentWillMount() {
    getiOSNotificationPermission();
  }

  picture(name, type) {
    var picture = require('./filter.png');
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

    if(type == 1)  {
      console.log(name);
      this.setState({selection: name,
                    picture})
    }

    else return picture;
  }

  async clicked(rowData) {
    this.props.onTodoClick(rowData);
    await this.saveKey(rowData);
  }

  async saveKey(rowData) {
    try {
      await AsyncStorage.setItem(rowData.name, JSON.stringify(!rowData.button));
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

      

  render() {
    Notifications.cancelAllScheduledNotificationsAsync();
    if(this.props.personalSchedule == 1) {
    return (
      <View>
      <View style={{flexDirection:'row', alignItems: 'center'}}>
      <SearchBar 
       containerStyle={styles.TextInputStyleClass}
       onChangeText={(text) => {
        this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
       this.setState({text})}
        }
       //value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
       lightTheme
        />
        <ModalDropdown defaultValue={'Filter'}
        dropdownStyle={{height: 'auto'}}
        style={{flex:1, height:'auto', justifyContent: 'center'}}
        options={['All', 'Entree', 'Meat', 'Vegetarian', 'Vegan', 'Side', 'Soup']}
        onSelect={(idx, value) => {
          this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
          this.picture(value, 1)}}>
          <Image
              source={this.state.picture}
              style={{width:40, height:40}}/>
        </ModalDropdown>
      </View>
      <FlatList
        ref="listRef"
        data={this.props.articles.todos.filter(function(item){
         const itemData = item.name.toUpperCase()
         const textData = this.state.text.toUpperCase()

         var filter = item.type.indexOf(this.state.selection) > -1;
         const searched = itemData.indexOf(textData) > -1;
         if(this.state.selection === 'All') filter = true;
         return filter && searched}.bind(this))}
        renderItem={({item}) => this.renderRow(item)}
        keyExtractor={(item, index) => index}
        style={styles.listView}
        contentContainerStyle={{paddingBottom:120}}
      />
      </View>

    );
  }
  else
    return (
      <FlatList
        data={this.props.articles.todos.filter(({ button }) => button !== false)}
        renderItem={({item}) => this.renderRow(item)}
        keyExtractor={(item, index) => item.key}
        style={styles.listView}
      />
    );
  }


  renderRow(rowData: string) {
    if(this.props.personalSchedule == 0 && rowData.button == true) {
      this.notification(rowData.row, rowData);
    }

    var picture = this.picture(rowData.type, 0);

    //if(this.props.personalSchedule == 0 && rowData.button == true || this.props.personalSchedule == 1) {
      //if(rowData.calorie === 14) console.log(JSONrowData);
    //}
    return (
      <Events pic={picture} rowData={rowData} onPress={() => this.clicked(rowData)}/> 
       );
    //}
    //else return (<View/>);
  }

  notification(rowID, rowData){
    //   const localnotification = {
    //     title: `${rowData.speaker} is speaking in 10 minutes`,
    //     body: `Location: ${rowData.location}`,
    //     android: {
    //       sound: true,
    //     },
    //     ios: {
    //       sound: true,
    //     },
    //   };

    //   var location = rowData.time.indexOf('-');
    //   var timeString = rowData.time.substr(0,location);
    //   var theTime = '2018-04-13 ' + timeString;
    //   var times = moment(theTime, 'YYYY-MM-DD HH:mm a').subtract(10, 'minutes').toDate();
    //   if(Date.now()<=times){
    //   const schedulingOptions = { time: times };
    //   Notifications.scheduleLocalNotificationAsync(
    //     localnotification,
    //     schedulingOptions
    //   );
    // }
    }
  }

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between' 
  },
  TextInputStyleClass: {
    flex:5,
    marginRight: 10
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Data);
//export default Data;
