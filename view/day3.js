/**
 * Day 3
 * twitter entrance animation
 */

'use strict';
import React, {
  Animated,
  AppRegistry,
  AlertIOS,
  Component,
  Easing,
  Image,
  NavigatorIOS,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var Util = require('./utils');
var Icon = require('react-native-vector-icons/Ionicons');
var AnimatedIcon = Animated.createAnimatedComponent(Icon);

var Entrance = React.createClass({
  getInitialState:function  () {
     return {
       transformAnim: new Animated.Value(1), 
       opacityAnim: new Animated.Value(1), 
     };
  },
  componentDidMount: function() {
     Animated.timing(         
       this.state.transformAnim,    
       {toValue: 50,
        duration: 1200,
        delay:2000,
        easing: Easing.elastic(2),
      },          
     ).start();
    Animated.timing(         
       this.state.opacityAnim,    
       {toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay:2200,
      },          
     ).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 3300);              
  },
  render: function () {
    return(
      <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
        <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="social-twitter"></AnimatedIcon>
      </Animated.View>
    )
  }
})

var TwitterPost =  React.createClass({
  getInitialState: function (){
    var twitterData = [];
    return {
      isRefreshing: false,
      rowData: twitterData,
    };
  },
  _onRefresh:function () {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 1000);
  },
  render: function () {
    return(
      <ScrollView
      style={styles.twitterPostContainer}
      refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ddd"/>}>
            <Image source={require('./img/day3.png')} style={{width:Util.size.width, height:Util.size.height-110}}></Image>
      </ScrollView>
    )
  }
})

var TwitterFlow =  React.createClass({
  render: function () {
    return(
      <View>
        <View style={styles.nav}>
          <View style={styles.navLeft}>
            <Icon name="person-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
          </View>
          <View style={styles.navMid}>
            <Icon name="social-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
          </View>
          <View style={styles.navRight}>
            <Icon name="ios-search-strong" size={23} style={{color:"#1b95e0", width:30}}></Icon>
            <Icon name="compose" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
          </View>
        </View>
        <TwitterPost></TwitterPost>
      </View>
    )
  }
})

var TwitterTab = React.createClass({
  getInitialState: function () {
    return {
      selectedTab:'主页',
    }
  },
  changeTab(tabName) {
      this.setState({
        selectedTab: tabName
      });
  },
  render: function(){
    return (
      <TabBarIOS
        barTintColor="#fff"
        tintColor="#1b95e0">
        <Icon.TabBarItem
        title="主页"
        iconName="ios-home-outline"
        selectedIconName="ios-home"
        onPress={ () => this.changeTab('主页') }
        selected={ this.state.selectedTab === '主页' }>
          <TwitterFlow></TwitterFlow>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="通知"
        iconName="ios-bell-outline"
        selectedIconName="ios-bell"
        onPress={ () => this.changeTab('通知') }
        selected={ this.state.selectedTab === '通知'}>
          <TwitterFlow></TwitterFlow>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="私信"
        iconName="ios-email-outline"
        selectedIconName="ios-email"
        onPress={ () => this.changeTab('私信') }
        selected={ this.state.selectedTab === '私信'}>
          <TwitterFlow></TwitterFlow>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="我"
        iconName="ios-person-outline"
        selectedIconName="ios-person"
        onPress={ () => this.changeTab('我') }
        selected={ this.state.selectedTab === '我'}>
          <TwitterFlow></TwitterFlow>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
});


var Day3 = React.createClass({
  getInitialState: function () {
    return{
      show:true
    }
  },
  _hideEntrance: function () {
    this.setState({
      show:false
    })
  },
	render: function () {
    var entrance = this.state.show? <Entrance hideThis={this._hideEntrance}></Entrance>:<View></View>
		return(
			<View style={styles.twitterContainer}>
        <TwitterTab></TwitterTab>
        {entrance}
      </View>
		)
	}
})

const styles = StyleSheet.create({
  itemWrapper:{
    backgroundColor: '#fff'
  },
  twitterContainer:{
    width: Util.size.width,
    height: Util.size.height
  },
  entrance:{
    position: "absolute",
    top:0, left:0,
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#1b95e0",
    alignItems:"center",
    justifyContent:"center"
  },
  twitter:{
    color:"#fff",
    position:"relative",
    top: -20,
    textAlign: "center"
  },
  nav:{
    flexDirection: "row",
    paddingTop: 30,
    borderBottomWidth: Util.pixel,
    borderBottomColor: "#ddd",
    paddingBottom:5,
    backgroundColor:"#fff"
  },
  navLeft:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  navMid:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  navRight:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row"
  },
  twitterPostContainer:{
    width: Util.size.width,
    height:Util.size.height-90,
    position:"relative",
    top:-20
  }
});

module.exports = Day3;