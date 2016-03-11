/**
 * Day 7
 * Basic pan gesture
 */
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  StatusBarIOS,
  Text,
  TouchableHighlight,
  PanResponder,
  View
} = React;
var Util = require('./utils');
var Icon = require('react-native-vector-icons/Ionicons');

var MoveableCircle = React.createClass({
	getInitialState: function () {
		return{
			color: "rgba(255,255,255,0.7)"
		}
	},
	_previousLeft: Util.size.width/2-40,
  	_previousTop: Util.size.height/2-50,
  	_maxTop: Util.size.height -110,
  	_maxLeft: Util.size.width -98,
  	_circleStyles: {},
  	circle: (null : ?{ setNativeProps(props: Object): void }),
  	_updatePosition: function() {
	    this.circle && this.circle.setNativeProps(this._circleStyles);
	},
	_endMove: function (evt, gestureState) {
		this._previousLeft += gestureState.dx;
	    this._previousTop += gestureState.dy;
	    this.setState({
        	color: "rgba(255,255,255,0.7)"
        })
	},
	componentWillMount: function() {
		this._panResponder = PanResponder.create({
		    onStartShouldSetPanResponder: (evt, gestureState) => true,
		    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		    onMoveShouldSetPanResponder: (evt, gestureState) => true,
		    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
		    onPanResponderGrant: (evt, gestureState) => {
		        this.setState({
		        	color: "white"
		        })
		    },
		    onPanResponderMove: (evt, gestureState) => {
		           this._circleStyles.style.left = this._previousLeft + gestureState.dx;
				   this._circleStyles.style.top = this._previousTop + gestureState.dy;
				   if (this._circleStyles.style.left<0) {
				   		this._circleStyles.style.left = 0;
				   };
				   if (this._circleStyles.style.top<5) {
				   		this._circleStyles.style.top = 5;
				   };
				   if (this._circleStyles.style.left>this._maxLeft) {
				   		this._circleStyles.style.left = this._maxLeft;
				   };
				   if (this._circleStyles.style.top>this._maxTop) {
				   		this._circleStyles.style.top = this._maxTop;
				   };
				   this._updatePosition();
		    },
		    onPanResponderTerminationRequest: (evt, gestureState) => true,
		    onPanResponderRelease: this._endMove,
		    onPanResponderTerminate: this._endMove,
	 	});

	    this._circleStyles = {
	      style: {
	        left: this._previousLeft,
	        top: this._previousTop,
	      }
	    };

  	},
  	componentDidMount: function() {
		this._updatePosition();
	},
	render: function () {
		return(
			<View ref={(circle) => {this.circle = circle;}} style={[styles.MoveableCircle,]} {...this._panResponder.panHandlers}>
				<Icon ref="baseball" name="ios-baseball" color={this.state.color} size={120}></Icon>
			</View>
		)
	}
})

var Day7 = React.createClass({
	componentWillMount: function () {
		StatusBarIOS.setStyle(1);
	},
	render: function () {
		return(
			<View style={styles.container}>
				<Image source={require('./img/agrass.png')} style={styles.bg}></Image>
				<View style={styles.circleContainer}>
					<MoveableCircle></MoveableCircle>
				</View>
			</View>
		)
	}
})

const styles = StyleSheet.create({
	container:{
		height:Util.size.height,
		width: Util.size.width
	},
	bg:{
		width: Util.size.width,
		resizeMode:"stretch",
		position:"absolute"
	},
	circleContainer:{
		height:Util.size.height,
		width: Util.size.width,
	},
	MoveableCircle:{
		backgroundColor:"transparent",
		position:"absolute",
		left:0,
		right:0
	}
});

module.exports = Day7;