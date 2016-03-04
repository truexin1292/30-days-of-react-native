/**
 * 30 Days of React Native
 */

'use strict';
import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var Day1 = require('./view/day1')

var MainView =  React.createClass({
  _jumpToDay: function(day){
    var dayTitle = "",
      dayComponent = null;

    switch(day){
      case 1:
        dayTitle = "Day 1: A stop watch";
        dayComponent = Day1;
    }

    this.props.navigator.push({
      title: dayTitle,
      component:dayComponent,
      navigationBarHidden: false,
    })
  },
  render: function() {
    return(
      <ScrollView>
         <TouchableHighlight underlayColor="#eee" onPress={()=> this._jumpToDay(1)}>
            <Text style={{color:'#555'}}>Day1: A stop watch</Text>
          </TouchableHighlight>
      </ScrollView>
    );
  }
})

class ThirtyDaysOfReactNative extends Component {
  render() {
    return (
      <NavigatorIOS
      ref='nav'
      style={styles.container}
      initialRoute={{
        title:"30 Days of RN",
        component: MainView,
        backButtonTitle: 'back',
        shadowHidden: true
      }}
      itemWrapperStyle={styles.itemWrapper}
      tintColor="#777"/>
    );
  }
}

const styles = StyleSheet.create({
 container:{
    flex:1,
  },
  itemWrapper:{
    backgroundColor: '#f3f3f3'
  },
});

AppRegistry.registerComponent('ThirtyDaysOfReactNative', () => ThirtyDaysOfReactNative);
