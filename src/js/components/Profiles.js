import React, { PureComponent } from 'react';
import {Alert, Text, View, TouchableOpacity, Linking, Dimensions, Button, Platform, Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import { toggleTodo } from '../actions/index.js';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

const MenuButton = (props) => {
  return (
    <TouchableOpacity onPress={() => {props.navigation.dispatch(NavigationActions.back(props.navigation.state.key))}} style={{marginLeft:10}}>
      <Icon name="arrow-back" size={30} style ={{color:'#00F', marginLeft:5}} />
    </TouchableOpacity>
  );
};

const LinkButton = (props) => {
  return (
    <TouchableOpacity onPress={()=>{ Linking.openURL(props.link)}} style={{marginLeft:10}}>
      <Icon type={props.type} name={props.name} size={60} style ={{color:'#00F', marginLeft:5}} />
    </TouchableOpacity>
  );
};

const nutritionalLink = 'https://www.myfitnesspal.com/';
const healthyEating = 'https://www.choosemyplate.gov/';

class Profile extends React.Component {
  static navigationOptions = {
        headerTitle: 'Food Profile'
    };


  render() {
  	const {name, type, calorie, protein, fat, carbs, rowID, button, pic, dhall, meal, ingredients, allergens} = this.props.navigation.state.params.rowData;
    //console.log(picture);
    return (
    <View style = {{backgroundColor: 'white', paddingTop:20, flex:1}}>
    <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
    <MenuButton navigation={this.props.navigation}/>
    <Text style = {styles.name}>{name} </Text>
    </View>

    <ScrollView contentContainerStyle={{flexDirection:'column', alignItems:'center'}}>
    <Image
            source={this.props.navigation.state.params.pic}
            style={styles.picture}
            resizeMode={'contain'}/>

            <View style = {styles.rightContainer}>
              <Text style = {{color: '#A5A5A5', marginBottom: Dimensions.get('window').height/15}}>{type} </Text>
              <View style={{}}>
              <Text style = {styles.info}>Dining Hall: {dhall} </Text>
              <Text style = {styles.info}>Ingredients: {ingredients} </Text>
              <Text style = {styles.info}>Allergens: {allergens} </Text>
              <Text style = {[styles.info, {marginBottom: 20}]}>Meal: {meal} </Text>
              </View>

              <View style = {{flexDirection: 'row'}}>
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

              <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20, marginBottom:40}}>
              <View style={{marginRight:Dimensions.get('window').width/4}}>
              <LinkButton link={nutritionalLink} name={'info'}/>
              </View>

              <LinkButton link={healthyEating} name={'food-apple'} type={'material-community'}/>
              </View>
            </View>
      </ScrollView>
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
  info: {
    fontSize:15,
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 10
  },
  time: {
    fontSize:15,
    color: 'black',
    fontWeight: 'bold',
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
