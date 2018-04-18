import React, { Component } from 'react';
import {Text, View, Platform, Alert, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import Events from './events.js';
import { Constants, Notifications, Permissions } from 'expo';
import moment from 'moment';

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

class Data extends React.Component {

  constructor({initialState}) {
    super();
      this.state = {
        buttons: initialState,
        loaded: false,
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        }),
      }
    }

  componentWillMount() {
    getiOSNotificationPermission();
  }



    componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.initialState) !== JSON.stringify(nextProps.initialState)) 
    {
           this.setState({ buttons: nextProps.initialState });  
    }
    
}

  render() {
    const ds = this.state.dataSource.cloneWithRows(this.props.initialState);
    Notifications.cancelAllScheduledNotificationsAsync();
    return (
      <ListView
        dataSource={ds}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading events...
        </Text>
      </View>
    );
  }


  renderRow(rowData: string, sectionID: number, rowID: number) {
    if(this.props.personalSchedule == 0 && this.state.buttons[rowID].button == true) {
      this.notification(rowID, rowData);
    }
    if(this.props.personalSchedule == 0 && this.state.buttons[rowID].button == true || this.props.personalSchedule == 1) {
    return (
      <Events name = {rowData.item_name} type = {rowData.category} calorie = {rowData.calories}
      initialState={this.props.initialState[rowID]} protein = {rowData.protein} carbs = {rowData.carbs}
       fat = {rowData.fat} screen = {this.props.screen} callbackParent={this.props.callbackParent} rowID={rowID} />
      );
    }
    else return (<View/>);
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
});

export default Data;
