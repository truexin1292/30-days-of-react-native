/**
 * Day 
 * pickerIOS, Modal
 */
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  Modal,
  View,
  DatePickerIOS
} = React;
var Util = require('./utils');

var Day15 = React.createClass({
	getInitialState() {
		var date = new Date(),
			time = this._getTime(date),
			showModal = false,
			setDate = new Date(),
			timeZoneOffsetInHours= (-1) * (new Date()).getTimezoneOffset() / 60;

		return {time,showModal,setDate,timeZoneOffsetInHours};
	},
	_getTime(date){
		var monthNames = [
		  "January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		];
		var day = date.getDate(),
			monthIndex = date.getMonth(),
			year = date.getFullYear(),
			hour = date.getHours(),
			minute = date.getMinutes();
		return day + ' ' + monthNames[monthIndex] + ' ' + year + " at "+(hour<10? "0"+hour:hour)+":"+(minute<10? "0"+minute:minute);
	},
	_pickTime(){
		this.setState({
			showModal:true
		})
	},
	_setTime(){
		this.setState({
			time: this._getTime(this.state.setDate),
			showModal:false
		});
	},
	_closeModal(){
		this.setState({showModal:false});
	},
	_onDateChange: function(date) {
		this.setState({setDate: date});
	},
	render() {
		return(
			<View style={styles.container}>
				<Text style={styles.date}>{this.state.time}</Text>
				<TouchableHighlight underlayColor="#f3f3f3" onPress={this._pickTime}>
					<Text style={styles.btnText}>change time</Text>
				</TouchableHighlight>
				<Modal
		          animated={true}
		          transparent={false}
		          visible={this.state.showModal}>
		          <View style={styles.modalContainer}>
		          	<View style={styles.modalNav}>
		          		<TouchableHighlight underlayColor="#fff" onPress={this._closeModal}><Text style={[styles.btnText,{width:80,textAlign:"left"}]}>Cancle</Text></TouchableHighlight>
		          		<Text style={styles.navTitle}>Choose a time</Text>
		          		<TouchableHighlight underlayColor="#fff" onPress={this._setTime}><Text style={[styles.btnText,,{width:80,textAlign:"right"}]}>Set</Text></TouchableHighlight>
		          	</View>
		            <View style={styles.modalContent}>
		                 <DatePickerIOS
				          date={this.state.setDate}
				          mode="date"
				          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
				          onDateChange={this._onDateChange}
				        />
				         <DatePickerIOS
				          date={this.state.setDate}
				          mode="time"
				          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
				          onDateChange={this._onDateChange}
				        />
		            </View>
		          </View>
		        </Modal>
			</View>
		)
	}
})

const styles = StyleSheet.create({
	container:{
		alignItems:"center",
		justifyContent:"center",
		height: Util.size.height,
		width: Util.size.width,
		paddingBottom:60
	},
	date:{
		fontSize:25
	},
	btnText:{
		color:"#4285f4",
		fontSize:16,
		paddingTop:10,
	},
	modalContainer:{
		height: Util.size.height,
		width: Util.size.width,
		backgroundColor:"#f1f1f1"
	},
	modalNav:{
		position:"absolute",
		height:60,
		width:375,
		backgroundColor:"#fff",
		flexDirection:"row",
		justifyContent:"space-between",
		paddingTop:20,
		paddingLeft:15,
		paddingRight:15
	},
	modalContent:{
		alignItems:"center",
		justifyContent:"center",
		width:375,
		height:Util.size.height-60,
		marginTop:60
	},
	navTitle:{
		paddingTop:8,
		fontWeight:"500",
		color:"#222",
		fontSize:18
	}
});

module.exports = Day15;