/**
 * Day 8
 * Swipe left
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
  LayoutAnimation,
  ScrollView,
  View
} = React;
var Map = require('./day5').map;
var Util = require('./utils');
var Icon = require('react-native-vector-icons/FontAwesome');

var Search = React.createClass({
	render: function () {
		return(
			<View>

			</View>
		)
	}
})

var Menu = React.createClass({
	render: function () {
		return(
			<View style={styles.sideMenuContainer}>
				<Image source={require('./img/map.png')} style={styles.img}></Image>
				<View style={styles.btnContainer}>
					<TouchableHighlight underlayColor="#888" onPress={()=>{true}}>
						<View style={styles.btn}>
							<Icon style={styles.btnIcon} name="map-marker" size={15}></Icon>
							<Text style={styles.btnText}>你的地点</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight underlayColor="#888" onPress={()=>{true}}>
						<View style={styles.btn}>
							<Icon style={styles.btnIcon} name="pencil-square" size={15}></Icon>
							<Text style={styles.btnText}>你的贡献</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight underlayColor="#888" onPress={()=>{true}}>
						<View style={styles.btn}>
							<Icon style={styles.btnIcon} name="product-hunt" size={15}></Icon>
							<Text style={styles.btnText}>离线区域</Text>
						</View>
					</TouchableHighlight>
				</View>
				<View style={styles.btnContainer}>
					<TouchableHighlight underlayColor="#888" onPress={()=>{true}}>
						<View style={styles.btn}>
							<Icon style={styles.btnIcon} name="road" size={15}></Icon>
							<Text style={styles.btnText}>实时路况</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight underlayColor="#888" onPress={()=>{true}}>
						<View style={styles.btn}>
							<Icon style={styles.btnIcon} name="bus" size={15}></Icon>
							<Text style={styles.btnText}>公交线路</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight underlayColor="#888" onPress={()=>{true}}>
						<View style={styles.btn}>
							<Icon style={styles.btnIcon} name="bicycle" size={15}></Icon>
							<Text style={styles.btnText}>骑车线路</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight underlayColor="#888" onPress={()=>{true}}>
						<View style={styles.btn}>
							<Icon style={styles.btnIcon} name="photo" size={15}></Icon>
							<Text style={styles.btnText}>卫星图像</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight underlayColor="#888" onPress={()=>{true}}>
						<View style={styles.btn}>
							<Icon style={styles.btnIcon} name="tree" size={15}></Icon>
							<Text style={styles.btnText}>地形</Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
})

var Day8 = React.createClass({
	getInitialState:function () {
		return{
			showDrop:false
		}
	},
	_previousLeft: -0.7*Util.size.width-10,
	_previousOpacity: 0,
	_minLeft: -0.7*Util.size.width-10,
	_menuStyles: {},
	_dropStyle: {},
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
  	menu: (null : ?{ setNativeProps(props: Object): void }),
  	drop: (null : ?{ setNativeProps(props: Object): void }),
  	_updatePosition: function() {
	    this.menu && this.menu.setNativeProps(this._menuStyles);
	    this.drop && this.drop.setNativeProps(this._dropStyles);
	},
	_endMove: function (evt, gestureState) {
		if (gestureState.vx<0||gestureState.dx<0){
			this._menuStyles.style.left = this._minLeft;
			this._dropStyles.style.opacity = 0;
			this._previousLeft = this._minLeft;
			this._previousOpacity = 0;
			this.setState({
		        showDrop:false
		    })
		}
		if(gestureState.vx>0||gestureState.dx>0){
			this._menuStyles.style.left = 0;
			this._dropStyles.style.opacity = 1;
			this._previousLeft = 0;
			this._previousOpacity = 1;
		}
		this._updatePosition();
		LayoutAnimation.configureNext(this._CustomLayoutLinear);
	},
	componentWillMount: function() {
		this._panResponder = PanResponder.create({
		    onStartShouldSetPanResponder: (evt, gestureState) => true,
		    onMoveShouldSetPanResponder: (evt, gestureState) => {
			    return gestureState.dy/gestureState.dx!=0;
			},
		    onPanResponderGrant: (evt, gestureState) => {
		        this.setState({
		        	showDrop:true
		        })
		    },
		    onPanResponderMove: (evt, gestureState) => {
		           this._menuStyles.style.left = this._previousLeft + gestureState.dx;
		           this._dropStyles.style.opacity = this._previousOpacity+Math.pow(gestureState.dx/(-this._minLeft),0.5);
		           if (this._menuStyles.style.left>0) {
		           		this._menuStyles.style.left = 0;
		           		this._dropStyles.style.opacity = 1;
		           };
		           if (this._menuStyles.style.left < this._minLeft) {
		           		this._menuStyles.style.left = this._minLeft;
		           		this._dropStyles.style.opacity = 0;
		           };
				   this._updatePosition();
				   LayoutAnimation.configureNext(this._CustomLayoutLinear);
		    },
		    onPanResponderTerminationRequest: (evt, gestureState) => true,
		    onPanResponderRelease: this._endMove,
		    onPanResponderTerminate: this._endMove,
		    onShouldBlockNativeResponder: (event, gestureState) => true,
	 	});

	    this._menuStyles = {
	      style: {
	        left: this._previousLeft,
	      }
	    };
	    this._dropStyles = {
	      style: {
	        opacity: this._previousOpacity,
	      }
	    };

  	},
  	componentDidMount: function() {
		this._updatePosition();
		StatusBarIOS.setStyle(1);
	},
	render: function () {
		return(
			<View style={styles.container}>
				<Map mapType="standard" mapStyle={styles.map} showsUserLocation={false} followUserLocation={false}></Map>
				<Search></Search>
				{this.state.showDrop?<View style={styles.drop}  ref={(drop) => {this.drop = drop;}}></View>:<View></View>}
				<View {...this._panResponder.panHandlers} style={styles.sideMenu} ref={(menu) => {this.menu = menu;}}>
					<Menu></Menu>
				</View>
			</View>
		)
	}
})

const styles = StyleSheet.create({
	container:{
		height:Util.size.height,
		width: Util.size.width,
	},
  	map:{
   		width: Util.size.width,
    	height: Util.size.height
  	},
  	sideMenu:{
	  	height: Util.size.height,
	  	width: 0.7*Util.size.width+20,
	  	position:"absolute",
	  	top:0,
	  	backgroundColor:"transparent",
	  	left: -0.7*Util.size.width-10,
  	},
  	sideMenuContainer:{
  		height: Util.size.height,
	  	width: 0.7*Util.size.width,
	  	backgroundColor:"#fff",
	  	shadowColor: "#000",
	    shadowOpacity: 0.3,
	    shadowRadius: 5,
	    shadowOffset: {
	      height: 0,
	      width: 2
	    }
  	},
  	drop:{
  		height: Util.size.height,
	  	width: Util.size.width,
	  	position:"absolute",
	  	top:0,
	  	left:0,
	  	opacity:0,
	  	backgroundColor:"rgba(0,0,0,0.6)"
  	},
  	img:{
  		width: 0.7*Util.size.width,
  		resizeMode:"contain",
  		height:0.7*Util.size.width/1.754,
  	},
  	btn:{
  		flexDirection:"row",
  		alignItems:"center",
  		paddingTop:15,
  		paddingBottom:15,
  		backgroundColor:"#fff"
  	},
  	btnIcon:{
  		flex:1,
  		textAlign:"center",
  		color:"#555"
  	},
  	btnText:{
  		flex:3,
  		fontSize:14,
  		fontWeight:"500",
  		paddingLeft:20,
  		color:"#454545"
  	},
  	btnContainer:{
  		paddingTop:10,
  		borderBottomWidth: Util.pixel,
  		borderBottomColor:"#bbb"
  	}
});

module.exports = Day8;