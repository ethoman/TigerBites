import React from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Events from './events.js'
import { Constants, Notifications, Permissions } from 'expo';

class MyHomeScreen extends React.Component {
static navigationOptions = {
    tabBarLabel: 'Home',
    title: 'igniteSTEM',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  };

  render() {
    return (
      <View style={styles.container}>
    <Image source={require('./ignite.jpg')} style={{width: 350, height: 500, marginBottom: 200}} />
      <Button
        onPress={() => this.props.navigation.navigate('Schedule')}
        title="Go to notifications"
      />
    </View>
    );
  }
}


class Schedule extends React.Component {
	static navigationOptions = {
    tabBarLabel: 'Schedule',
    headerTitle: 'igniteSTEM',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  };
   notification(){
    const localnotification = {
      title: 'Talk in 5min',
      body: 'hi kevvy',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += 1000;

    const schedulingOptions = { time: sendAfterFiveSeconds };
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
  }

  render() {
    return (
    <View  style={styles.container}>
    
    <ScrollView>
    
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>
    <Events name={'Erics'} time={1200} location={'joline'} onPress={ () => this.notification()}/>

    <Button
        onPress={() => this.props.navigation.navigate('Home')}
        title="Go Home"
      />
      
    </ScrollView>
    
    </View>
    );
  }
}


const SimpleTabs = TabNavigator(
  {
    Home: {
      screen: MyHomeScreen,
    },
    Schedule: {
      screen: Schedule,
    },
  },
  {
  	title: 'igniteSTEM',
  	tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
      style: {
      marginTop: Platform.OS === 'ios' ? 50 : 24
  	},

    },
  }
);

const styles = StyleSheet.create({
  container: {
  	marginTop: 3,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between' 
  },
});

export default SimpleTabs;