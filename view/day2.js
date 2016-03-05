/**
 * Day 2
 * A weather app
 */

'use strict';
import React, {
  AppRegistry,
  AlertIOS,
  Component,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var Util = require('./utils')

var WeatherAbstract = React.createClass({
	render: function () {
		return(
			<View></View>
		)
	}
})

var Day2 = React.createClass({
	render: function () {
		return(
			<View style={styles.weatherContainer}>
				<WeatherAbstract></WeatherAbstract>
			</View>
		)
	}
})

const styles = StyleSheet.create({
})

module.exports = Day2;