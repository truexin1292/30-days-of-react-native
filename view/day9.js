/**
 * Day 9
 * 
 */
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  PanResponder,
  LayoutAnimation,
  ScrollView,
  TabBarIOS,
  StatusBarIOS,
  View
} = React;
var Util = require('./utils');
var Icon = require('react-native-vector-icons/Ionicons');

var TwitterUser = React.createClass({
	getInitialState: function () {
		return{
			scrollEnabled: false
		}
	},
	_previousTop: 0,
	_minTop: -100,
	_userStyle:{},
	_CustomLayoutLinear:{
	    duration: 200,
	    create: {
	      type: LayoutAnimation.Types.linear,
	      property: LayoutAnimation.Properties.left,
	    },
	    update: {
	      type: LayoutAnimation.Types.curveEaseInEaseOut,
	    },
  	},
  	user: (null : ?{ setNativeProps(props: Object): void }),
  	_updatePosition: function() {
	    this.user && this.user.setNativeProps(this._userStyles);
	},
	_endMove: function (evt, gestureState) {
		this._previousTop = this._userStyles.style.top;
	},
	componentWillMount: function() {
		this._panResponder = PanResponder.create({
		    onStartShouldSetPanResponder: (evt, gestureState) => true,
		    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		    onMoveShouldSetPanResponder: (evt, gestureState) => {
		    	return gestureState.dy/gestureState.dx!=0;
			},
		    onPanResponderGrant: (evt, gestureState) => {
		       
		    },
		    onPanResponderMove: (evt, gestureState) => {
	           	this._userStyles.style.top = this._previousTop + gestureState.dy;
	           	if (this._userStyles.style.top>0) {
	           		this._userStyles.style.top = 0;
	           	};
	           	if (this._userStyles.style.top < this._minTop) {
	           		this._userStyles.style.top = this._minTop;
	           	};
			   	this._updatePosition();
			   	LayoutAnimation.configureNext(this._CustomLayoutLinear);
		    },
		    onPanResponderTerminationRequest: (evt, gestureState) => true,
		    onPanResponderRelease: this._endMove,
		    onPanResponderTerminate: this._endMove,
		    onShouldBlockNativeResponder: (event, gestureState) => true,
	 	});

	    this._userStyles = {
	      style: {
	        top: this._previousTop,
	      }
	    };

  	},
  	componentDidMount: function() {
		this._updatePosition();
	},
	render: function () {
		var panProps = this.state.scrollEnabled?{}:{...this._panResponder.panHandlers};
		return(
			<View ref={(user) => {this.user = user;}} style={styles.userContainer} {...panProps}>
				<View style={styles.userPanel}>
					<Image style={styles.banner} source={require("./img/banner.png")}></Image>
				</View>
				<ScrollView contentInset={{top:0}} style={styles.detailScroll} scrollEnabled={this.state.scrollEnabled}>
					<View style={{width:Util.size.width,height:1000, backgroundColor:"#111"}}></View>
				</ScrollView>
			</View>
		)
	}
})

var TwitterTab = React.createClass({
  getInitialState: function () {
    return {
      selectedTab:'我',
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
          <TwitterUser></TwitterUser>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="通知"
        iconName="ios-bell-outline"
        selectedIconName="ios-bell"
        onPress={ () => this.changeTab('通知') }
        selected={ this.state.selectedTab === '通知'}>
          <TwitterUser></TwitterUser>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="私信"
        iconName="ios-email-outline"
        selectedIconName="ios-email"
        onPress={ () => this.changeTab('私信') }
        selected={ this.state.selectedTab === '私信'}>
          <TwitterUser></TwitterUser>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="我"
        iconName="ios-person-outline"
        selectedIconName="ios-person"
        onPress={ () => this.changeTab('我') }
        selected={ this.state.selectedTab === '我'}>
          <TwitterUser></TwitterUser>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
});

var Day9 = React.createClass({
	componentDidMount: function () {
		StatusBarIOS.setStyle(1);
	},
	render: function () {
		return(
			<View style={styles.twitterContainer}>
				<TwitterTab></TwitterTab>
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
  	userContainer:{
  		width: Util.size.width,
    	height: Util.size.height-50,
    	backgroundColor:"#333",
    	position:"absolute",
    	top:0,
    	left:0
  	},
  	detailScroll:{
  		position:"absolute",
  		top: 300,
  		backgroundColor:"#fff",
  		width: Util.size.width,
    	height: Util.size.height-350,
    	left:0
  	},
  	userPanel:{
  		flex:1,
  		height:300
  	},
  	banner:{
  		width: Util.size.width,
  		height:125,
  		position:"absolute",
  		top:0,
  		left:0
  	}
});

module.exports = Day9;