/**
 * 30 Days of React Native
 */

'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  NavigatorIOS,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var Util = require('./view/utils');
var Icon = require('react-native-vector-icons/Ionicons');
var Swiper = require('react-native-swiper');

var MainView =  React.createClass({
  getInitialState:function () {
      return{
        days:[{
          key:0,
          title:"A stopwatch",
          component: require('./view/day1'),
          icon: "ios-stopwatch",
          size: 48,
          color: "#ff856c",
          hideNav: false,
        },{
          key:1,
          title:"A weather app",
          component: require('./view/day2'),
          icon: "ios-partlysunny",
          size:60,
          color:"#90bdc1",
          hideNav: true,
        },{
          key:2,
          title:"twitter",
          component: require('./view/day3'),
          icon: "social-twitter",
          size:50,
          color:"#1b95e0",
          hideNav: false,
        }]
      }
  },
  _jumpToDay: function(index){
    this.props.navigator.push({
      title: this.state.days[index].title,
      component: this.state.days[index].component,
      navigationBarHidden: this.state.days[index].hideNav,
    })
  },
  render: function() {
    var onThis = this;
    var boxs = this.state.days.map(function(elem, index) {
      return(
        <TouchableHighlight key={elem.key} style={[styles.touchBox,styles.touchBox1]} underlayColor="#eee" onPress={()=> onThis._jumpToDay(index)}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}>Day{index+1}</Text>
            <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>
          </View>
        </TouchableHighlight>
      );
    })
    return(
      <ScrollView>
        <Swiper height={150} showsButtons={false} autoplay={true}>
          <TouchableHighlight onPress={()=> onThis._jumpToDay(0)}>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./view/img/day1.png')}></Image>
              <Text style={styles.slideText}>Day1: A stopwatch</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> onThis._jumpToDay(1)}>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./view/img/day2.png')}></Image>
              <Text style={styles.slideText}>Day2: A weather app</Text>
            </View>
          </TouchableHighlight>
        </Swiper>
        <View style={styles.touchBoxContainer}>
          {boxs}
        </View>
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
        shadowHidden: true,
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
  touchBox:{
    width: Util.size.width/3,
    height:Util.size.width/3,
    backgroundColor:"#fff",
  },
  touchBoxContainer:{
    flexDirection: "row", 
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox1:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox2:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
  },
  boxContainer:{
    alignItems:"center",
    justifyContent:"center",
    width: Util.size.width/3,
    height:Util.size.width/3,
  },
  boxIcon:{
    position:"relative",
    top:-10
  },
  boxText:{
    position:"absolute",
    bottom:15,
    width:Util.size.width/3,
    textAlign:"center",
    left: 0,
    backgroundColor:"transparent"
  },
  slide: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText:{
    position:"absolute",
    bottom: 0,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"rgba(255,255,255,0.5)",
    width: Util.size.width,
    textAlign:"center",
    fontSize: 12
  },
  image:{
    width: Util.size.width,
    flex: 1,
    alignSelf: 'stretch',
  }
});

AppRegistry.registerComponent('ThirtyDaysOfReactNative', () => ThirtyDaysOfReactNative);
