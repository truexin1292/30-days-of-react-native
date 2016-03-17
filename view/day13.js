/**
 * Day 13
 * A twitter tweet UI
 */
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  CameraRoll,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;
var Util = require('./utils');
var Icon = require('react-native-vector-icons/Ionicons');

var FunctionView = React.createClass({
	getInitialState() {
		return {
			images: [],
		};
	},
	componentDidMount() {
	    const fetchParams = {
	      first: 4,
	    };
	    CameraRoll.getPhotos(fetchParams).done(this.storeImages, this.logImageError);
	},
	storeImages(data) {
	    const assets = data.edges;
	    const images = assets.map((asset) => asset.node.image);
	    this.setState({
	      images: images,
	    });
  	},
  	logImageError(err) {
	    console.log(err);
	},
	render: function () {
		return(
			<View style={styles.functionContainer}>
				<View style={styles.functionIconContainer}>
					<View style={styles.functionIcon}>
						<Icon name="location" size={23} color="#8899a5"></Icon>
						<Icon name="camera" size={23} color="#8899a5"></Icon>
						<Icon name="image" size={23} color="#8899a5"></Icon>
						<Icon name="pie-graph" size={23} color="#8899a5"></Icon>
					</View>
					<View style={styles.functionBtn}>
						<Text style={styles.text}>{this.props.numOfText}</Text>
						<TouchableHighlight style={this.props.numOfText==140?styles.btn:styles.activeBtn}>
							<Text style={this.props.numOfText==140?styles.btnText:styles.activeBtnText}>发推</Text>
						</TouchableHighlight>
					</View>
				</View>
				<View style={styles.imageGrid}>
					<View style={styles.imageIcon}>
						<Icon name="ios-camera" size={80} color="#2aa2ef"></Icon>
					</View>
					<View style={styles.imageIcon}>
						<Icon name="ios-videocam" size={80} color="#2aa2ef"></Icon>
					</View>
		        	{ this.state.images.map((image,index) => <View key={index} style={styles.imageIcon}><Image style={styles.image} source={{ uri: image.uri }} /></View>) }
		        </View>
			</View>
		)
	}
})

var Day13 = React.createClass({
	getInitialState() {
		return {
			numOfText:140,
		};
	},
	_updateTextNum: function(text) {
		var remain = 140 - text.length;
		this.setState({
			numOfText:remain
		})
	},
	render: function () {
		return(
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					<Image style={styles.icon} source={require('./img/icon.png')}></Image>
					<Icon name="android-close" color="#2aa2ef" size={25}></Icon>
				</View>
				<TextInput 
					ref="textarea"
					style={styles.textArea}
					maxLength={140}
					multiline={true}
					placeholder="有什么新鲜事？"
					selectionColor="#2aa2ef"
					placeholderTextColor="#ced8de"
					onChangeText={(text) => this._updateTextNum(text)}></TextInput>
				<FunctionView numOfText={this.state.numOfText}></FunctionView>
			</View>
		)
	}
})

const styles = StyleSheet.create({
	container:{
		paddingTop:30,
		height:Util.size.height,
	},
	icon:{
		width:30,
		height:30,
		borderRadius:5,
	},
	iconContainer:{
		paddingLeft:15,
		paddingRight:15,
		flexDirection:"row",
		justifyContent:"space-between",
	},
	textArea:{
		height:335,
		padding:15,
		fontSize:20
	},
	functionContainer:{
		height:275,
		width:375,
		position:"absolute",
		bottom:0,
		left:0,
		borderTopWidth:1,
		borderTopColor:"#a0adb7"
	},
	functionIconContainer:{
		height:50,
		alignItems:"center",
		justifyContent:"space-between",
		flexDirection:"row",
		borderBottomWidth:1,
		borderBottomColor:"#ccd6dd"
	},
	functionIcon:{
		width:210,
		flexDirection:"row",
		justifyContent:"space-around"
	},
	functionBtn:{
		width:110,
		flexDirection:"row",
		justifyContent:"space-around",
		alignItems:"center",
	},
	btn:{
		height:35,
		width:60,
		alignItems:"center",
		justifyContent:"center",
		borderRadius:6,
		borderColor:"#ccd6dd",
		borderWidth:1
	},
	activeBtn:{
		height:35,
		width:60,
		alignItems:"center",
		justifyContent:"center",
		borderRadius:6,
		backgroundColor:"#2aa2ef"
	},
	text:{
		color:"#ccd6dd",
		fontSize:18
	},
	btnText:{
		color:"#ccd6dd",
		fontSize:14
	},
	activeBtnText:{
		color:"#fff",
		fontSize:14
	},
	imageGrid:{
		flexDirection:"row",
		flexWrap:"wrap"
	},
	imageIcon:{
		width: 125,
		height:113,
		alignItems:"center",
		justifyContent:"center",
		borderRightColor:"#ddd",
		borderBottomColor:"#ddd",
		borderRightWidth:1,
		borderBottomWidth:1
	},
	image:{
		width: 125,
		height:113,
	}
});

module.exports = Day13;