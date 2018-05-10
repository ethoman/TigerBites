import React, { PureComponent } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, AsyncStorage, StyleSheet, TouchableHighlight } from 'react-native';
import { Notifications, Permissions } from 'expo';
import {StackNavigator, withNavigation, NavigationActions} from 'react-navigation';
import { toggleTodo } from '../actions/index.js';
import { connect } from 'react-redux';

const PUSH_ENDPOINT = 'http://vast-chamber-81818.herokuapp.com/notifications/token';

// taken from expo website
async function registerForPushNotificationsAsync(data) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: token,
      title: data.name,
      data: data,
      body: data.dhall
    }),
  });
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


class Events extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.rowData.button !== this.props.rowData.button || nextProps.rowData.name !== this.props.rowData.name)
      return true;
    return false;
  }


  clicked(rowData) {
    this.props.onTodoClick(rowData);
    this.saveKey(rowData);
    registerForPushNotificationsAsync(rowData);
  }

  async saveKey(rowData) {
    try {
      await AsyncStorage.setItem(rowData.name, JSON.stringify(!rowData.button));
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  render() {
  	const {name, type, calorie, protein, fat, carbs, rowID, button} = this.props.rowData;
    //console.log(picture);
    return (
    <View style={styles.event}>
     <TouchableHighlight onPress={() => this.clicked(this.props.rowData)} underlayColor={'gray'}>
        <Image
            source={this.props.pic}
            style={styles.picture}
            resizeMode={'contain'}>

            
              <View style={styles.picture}>

                <Image
                  source={require('./checkbox.png')}
                  style={[styles.checkVisible, button ? {opacity: 1} : {tintColor: 'gray', opacity: .5}]}>
                </Image>
              </View>
              </Image>
              </TouchableHighlight>
            <TouchableHighlight style = {styles.rightContainer} underlayColor={'lightgray'} onPress={() => this.props.navigation.navigate('Profile', {...this.props})}>
            <View>
              <Text style = {styles.name}>{name} </Text>
              <Text style = {styles.time}>Type: {type} </Text>
            </View>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
event: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: '#DDDDDD',
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
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
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
  time: {
    fontSize:15,
    color: '#A5A5A5',
    paddingLeft: 15,
  },
  rightContainer: {
    flex: 1, 
  },
  thumbnail: {
     width: 40,
     height: 53,
    marginLeft: 7,
  },
  picture: {
    width: 50,
    height: 50,
  },
  checkVisible: {
    width: 10,
    height: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Events));
