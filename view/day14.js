/**
 * Day 14
 * Tinder Like Swipe
 * know bugs. simg of png win't change no matter how. Other properties changes fine.
 * but changes to gif works fine
 * Maybe bugs internally
 */
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  PanResponder,
  Animated,
  LayoutAnimation,
  View
} = React;
var Util = require('./utils');
var Icon = require('react-native-vector-icons/Ionicons');
import SwipeCards from 'react-native-swipe-cards';

var Card = React.createClass({
	render(){
		return(
			<View style={[styles.card,{top:this.props.top,width:this.props.width,left:this.props.left}]}>
				<Image style={{width:this.props.width-2,height:350}} source={{uri:this.props.img}}></Image>
				<View style={styles.cardInfo}>
					<View>
						<Text style={styles.cardText}>{this.props.name}, very old  <Icon name="ios-checkmark" size={18} color="#208bf6"></Icon></Text>
					</View>
					<View style={styles.cardIcon}>
						<View style={styles.cardIconContainer}>
							<Icon name="ios-people" size={25} color="#fc6b6d"></Icon>
							<Text style={[styles.cardIconText,{color:"#fc6b6d"}]}>0</Text>
						</View>
						<View style={styles.cardIconContainer}>
							<Icon name="ios-book" size={25} color="#cecece"></Icon>
							<Text style={[styles.cardIconText,{color:"#cecece"}]}>0</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}
})

var SCard = React.createClass({
	render(){
		return(
			<View style={[styles.scard,{top:this.props.top,width:this.props.width}]}>
				<Image style={{width:this.props.width-2,height:350}} source={{uri:this.props.img}}></Image>
				<View style={styles.cardInfo}>
					<View>
						<Text style={styles.cardText}>{this.props.name}, very old  <Icon name="ios-checkmark" size={18} color="#208bf6"></Icon></Text>
					</View>
					<View style={styles.cardIcon}>
						<View style={styles.cardIconContainer}>
							<Icon name="ios-people" size={25} color="#fc6b6d"></Icon>
							<Text style={[styles.cardIconText,{color:"#fc6b6d"}]}>0</Text>
						</View>
						<View style={styles.cardIconContainer}>
							<Icon name="ios-book" size={25} color="#cecece"></Icon>
							<Text style={[styles.cardIconText,{color:"#cecece"}]}>0</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}
})

var SwipeCard = React.createClass({
  getInitialState() {
  	var simgs=["minion1","minion2","minion3","minion4","minion5"],
		names=["Stuart","Bob","Kevin","Dave","Jerry"];
  	var swipeData = simgs.map(function(elem, index) {
		return {img:simgs[4-index], name:names[4-index], top:13+index*4, width:353-index*4,}
	})
    return {
      cards: swipeData
    }
  },
  handleYup (card) {
  	this.props.next();
  },
  handleNope (card) {
  	this.props.next()
  },
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <SCard {...cardData} />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        showYup={false}
        showNope={false}
      />
    )
  }
})

var Cards = React.createClass({
	getInitialState() {
		return {
			imgs:["minion1","minion2","minion3","minion4"],
			names:["Stuart","Bob","Kevin","Dave","Jerry"]
		};
	},
	_next: function() {
		var imgs = this.state.imgs;
		imgs.pop();
		this.setState({
			imgs: imgs
		})
	},
	render() {
		var {names} = this.state;
		var cards = this.state.imgs.map(function(elem, index) {
			return <Card key={index} name={names[index]} img={elem} top={30-index*4} width={337+index*4} left={18-index*2}></Card>
		})
		return (
			<View>
				{cards}
				<SwipeCard next={this._next}></SwipeCard>
			</View>
		);
	} 
})

var Day14 = React.createClass({
	render() {
		return(
			<View style={styles.container}>
				<View style={styles.nav}>
					<Icon name="gear-b" size={35} color="#cecece"></Icon>
					<Image style={styles.logo} source={require('./img/tinder.png')}></Image>
					<Icon name="chatbubbles" size={35} color="#cecece"></Icon>
				</View>
				<View style={styles.actionContainer}>
					<View style={[styles.smallAction,{left:5}]}>
						<Icon name="android-refresh" color="#fdcd6d" size={30}></Icon>
					</View>
					<View style={styles.largeAction}>
						<Icon name="close" color="#fc6c6e" size={45}></Icon>
					</View>
					<View style={styles.largeAction}>
						<Icon name="heart" color="#52cb93" size={45}></Icon>
					</View>
					<View style={[styles.smallAction,{right:5}]}>
						<Icon name="location" color="#318ff6" size={30}></Icon>
					</View>
				</View>
				<Cards></Cards>
			</View>
		)
	}
})

const styles = StyleSheet.create({
	container:{
		backgroundColor:"#fff",
		height:Util.size.height,
		width:375
	},
	nav:{
		width:375,
		flexDirection:"row",
		justifyContent:"space-between",
		height:60,
		paddingTop:20,
		paddingBottom:5,
		paddingLeft:15,
		paddingRight:15,
		backgroundColor:"#fff",
		borderBottomColor:"#ebebeb",
		borderBottomWidth:1
	},
	card:{
		width:355,
		height:410,
		borderRadius:5,
		borderWidth:1,
		borderColor:"#e1e1e1",
		position:"absolute",
		left:10,
		top:70,
		backgroundColor:"#fff"
	},
	scard:{
		width:355,
		height:410,
		borderRadius:5,
		borderWidth:1,
		borderColor:"#e1e1e1",
		position:"relative",
		backgroundColor:"#fff",
		top:13
	},
	logo:{
		width:91,
		height:39
	},
	cardInfo:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		height:60,
		paddingLeft:20,
		paddingRight:5
	},
	cardText:{
		fontSize:20,
		fontWeight:"500",
		color:"#423e39"
	},
	cardIcon:{
		flexDirection:"row"
	},
	cardIconContainer:{
		width:50,
		flexDirection:"row",
		alignItems:"center",
	},
	cardIconText:{
		paddingLeft:5,
		fontWeight:"500",
		fontSize:16
	},
	actionContainer:{
		paddingLeft:7.5,
		paddingRight:7.5,
		flexDirection:"row",
		alignItems:"flex-start",
		top: 520,
		position:"absolute",
	},
	smallAction:{
		width: 70,
		height:70,
		borderColor:"#f5f5f5",
		borderWidth:10,
		borderRadius:35,
		alignItems:"center",
		justifyContent:"center",
		position:"relative",
		paddingTop:5
	},
	largeAction:{
		width: 110,
		height:110,
		borderColor:"#f5f5f5",
		borderWidth:10,
		borderRadius:55,
		alignItems:"center",
		justifyContent:"center",
		paddingTop:5
	}
});

module.exports = Day14;