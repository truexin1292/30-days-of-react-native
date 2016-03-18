/**
 * 30 Days of React Native
 */
'use strict';

var React = require('react-native');
var {
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
} = React;
var Util = require('./view/utils');
var Icon = require('react-native-vector-icons/Ionicons');
var IconFA = require('react-native-vector-icons/FontAwesome');
var Swiper = require('react-native-swiper');

var MainView =  React.createClass({
  getInitialState:function () {
      return{
        days:[{
          key:0,
          title:"A stopwatch",
          component: require('./view/day1'),
          isFA: false,
          icon: "ios-stopwatch",
          size: 48,
          color: "#ff856c",
          hideNav: false,
        },{
          key:1,
          title:"A weather app",
          component: require('./view/day2'),
          isFA: false,
          icon: "ios-partlysunny",
          size:60,
          color:"#90bdc1",
          hideNav: true,
        },{
          key:2,
          title:"twitter",
          component: require('./view/day3'),
          isFA: false,
          icon: "social-twitter",
          size:50,
          color:"#2aa2ef",
          hideNav: true,
        },{
          key:3,
          title:"cocoapods",
          component: require('./view/day4'),
          isFA: true,
          icon: "contao",
          size:50,
          color:"#FF9A05",
          hideNav: false,
        },{
          key:4,
          title:"find my location",
          component: require('./view/day5').Day5,
          isFA: false,
          icon: "ios-location",
          size:50,
          color:"#00D204",
          hideNav: false,
        },{
          key:5,
          title:"Spotify",
          component: require('./view/day6'),
          isFA: true,
          icon: "spotify",
          size:50,
          color:"#777",
          hideNav: true,
        },{
          key:6,
          title:"Moveable Circle",
          component: require('./view/day7'),
          isFA: false,
          icon: "ios-baseball",
          size:50,
          color:"#5e2a06",
          hideNav: true,
        },{
          key:7,
          title:"Swipe Left Menu",
          component: require('./view/day8'),
          isFA: true,
          icon: "google",
          size:50,
          color:"#4285f4",
          hideNav: true,
        },{
          key:8,
          title:"Twitter Parallax View",
          component: require('./view/day9'),
          isFA: false,
          icon: "social-twitter-outline",
          size:50,
          color:"#2aa2ef",
          hideNav: true,
        },{
          key:9,
          title:"Tumblr Menu",
          component: require('./view/day10'),
          isFA: false,
          icon: "social-tumblr",
          size:50,
          color:"#37465c",
          hideNav: true,
        },{
          key:10,
          title:"OpenGL",
          component: require('./view/day11'),
          isFA: false,
          icon: "contrast",
          size:50,
          color:"#2F3600",
          hideNav: false,
        },{
          key:11,
          title:"charts",
          component: require('./view/day12'),
          isFA: false,
          icon: "stats-bars",
          size:50,
          color:"#fd8f9d",
          hideNav: false,
        },{
          key:12,
          title:"tweet",
          component: require('./view/day13'),
          isFA: false,
          icon: "chatbox-working",
          size:50,
          color:"#83709d",
          hideNav: true,
        },{
          key:13,
          title:"tinder",
          component: require('./view/day14'),
          isFA: false,
          icon: "fireball",
          size:50,
          color:"#ff6b6b",
          hideNav: true,
        },{
          key:14,
          title:"Time picker",
          component: require('./view/day15'),
          isFA: false,
          icon: "ios-calendar-outline",
          size:50,
          color:"#ec240e",
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
            {elem.isFA? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></IconFA>:
              <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>}
          </View>
        </TouchableHighlight>
      );
    })
    return(
      <ScrollView>
        <Swiper height={150} showsButtons={false} autoplay={true}
          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
          <TouchableHighlight onPress={()=> onThis._jumpToDay(11)}>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./view/img/day1.png')}></Image>
              <Text style={styles.slideText}>Day12: Charts</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> onThis._jumpToDay(10)}>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./view/img/day2.png')}></Image>
              <Text style={styles.slideText}>Day11: OpenGL</Text>
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

var ThirtyDaysOfReactNative = React.createClass({
  componentDidMount: function () {
    StatusBarIOS.setStyle(0);
  },
  render: function(){
    return (
      <NavigatorIOS
      ref='nav'
      style={styles.container}
      initialRoute={{
        // title:"30 Days of RN",
        title:"Time Picker",
        // component: MainView,
        component: require('./view/day15'),
        // titleTextColor:"#ff6b6b",
        backButtonTitle: 'back',
        shadowHidden: true,
        // navigationBarHidden:true
      }}
      itemWrapperStyle={styles.itemWrapper}
      tintColor="#777"/>
    );
  }
})

const styles = StyleSheet.create({
 container:{
    flex:1,
  },
  itemWrapper:{
    backgroundColor: '#f3f3f3'
  },
  touchBox:{
    width: Util.size.width/3-0.34,
    height:Util.size.width/3,
    backgroundColor:"#fff",
  },
  touchBoxContainer:{
    flexDirection: "row", 
    flexWrap:"wrap",
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
