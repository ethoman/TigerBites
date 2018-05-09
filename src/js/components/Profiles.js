import React, { PureComponent } from 'react';
import {Alert, Text, View, TouchableOpacity, Dimensions, Button, Platform, Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import {StackNavigator} from 'react-navigation';
import { toggleTodo } from '../actions/index.js';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

const MenuButton = (props) => {
  return (
    <TouchableOpacity onPress={() => {props.navigation.goBack()}} style={{marginLeft:10}}>
      <Icon name="arrow-back" size={30} style ={{color:'#00F', marginLeft:5}} />
    </TouchableOpacity>
  );
};

class Profile extends React.Component {
  static navigationOptions = {
        headerTitle: 'Food Profile'
    };


  render() {
    console.log(this.props.navigation.state.params);
  	const {name, type, calorie, protein, fat, carbs, rowID, button, pic, dhall, meal} = this.props.navigation.state.params.rowData;
    //console.log(picture);
    return (
    <View style = {{backgroundColor: 'white', flex:1}}>
    <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
    <MenuButton navigation={this.props.navigation}/>
    <Text style = {styles.name}>{name} </Text>
    </View>

    <View style={{flexDirection:'column', alignItems:'center'}}>
    <Image
            source={this.props.navigation.state.params.pic}
            style={styles.picture}
            resizeMode={'contain'}/>


            <View style = {styles.rightContainer}>
              <Text style = {[styles.time, {marginBottom: Dimensions.get('window').height/8}]}>{type} </Text>
              <View>
              <Text style = {styles.time}>Dining Hall: {dhall} </Text>
              <Text style = {[styles.time, {marginTop: 10, marginBottom: Dimensions.get('window').height/8}]}>Meal: {meal} </Text>
              </View>

              <View style = {{flexDirection: 'row', justifyContent:'center'}}>
              <View style = {{flexDirection: 'column', flex:1, marginLeft:20}}>
                <Text style = {styles.time}>Calories </Text>
                <Text style = {styles.time}>{calorie}</Text>
              </View>
              <View style = {{flexDirection: 'column', flex:1}}>
                <Text style = {styles.time}>Protein </Text>
                <Text style = {styles.time}>{protein}g</Text>
              </View>
              <View style = {{flexDirection: 'column', flex:1}}>
                <Text style = {styles.time}>Fat </Text>
                <Text style = {styles.time}>{fat}g</Text>
              </View>
              <View style = {{flexDirection: 'column', marginRight:20}}>
                <Text style = {styles.time}>Carbs </Text>
                <Text style = {styles.time}>{carbs}g</Text>
              </View>
              </View>

            </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
event: {
    paddingLeft: 5,
    marginLeft: .2,
    paddingTop: 5, 
    paddingBottom: 5,
    padding: 10,
    marginTop: 3

  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: 5,
    flex:1

  },
  time: {
    fontSize:15,
    color: '#A5A5A5',
  },
  rightContainer: {
    alignItems: 'center',
  },
  thumbnail: {
     width: 40,
     height: 53,
    marginLeft: 7,
  },
  picture: {
    justifyContent: 'center',
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').width/2,
  },
  checkVisible: {
    width: 10,
    height: 10,
  },
});

export default Profile;
