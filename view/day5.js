/**
 * Day 5
 * find my location
 */

'use strict';
import React, {
  Component,
  Image,
  MapView,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

var Util = require('./utils');
var Icon = require('react-native-vector-icons/Ionicons');

var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0',
};

var Map = React.createClass({
  getInitialState: function () {
    return{
      isFirstLoad: true,
      mapRegion: undefined,
      mapRegionInput: undefined,
      annotations: [],
    }
  },
  _getAnnotations: function(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  },
  _onRegionChange: function(region) {
    this.setState({
      mapRegionInput: region,
    });
  },
  _onRegionChangeComplete: function(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  },
  _onRegionInputChanged: function(region) {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: this._getAnnotations(region),
    });
  },
  render: function () {
    return(
      <View>
        <MapView
          style={styles.map}
          showsUserLocation={this.props.showsUserLocation}
          followUserLocation={this.props.followUserLocation}
          onRegionChange={this._onRegionChange}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion}
          annotations={this.state.annotations}/>
      </View>
    )
  }
})

var Day5 = React.createClass({
  getInitialState: function () {
    return{
      showGeo:false
    }
  },
  _getLocation: function () {
    this.setState({
      showGeo: true
    })
  },
	render: function () {
		return(
			<View style={styles.container}>
        <Map showsUserLocation={this.state.showGeo} followUserLocation={this.state.showGeo}></Map>
        <TouchableHighlight underlayColor="#00bd03" style={styles.btn} onPress={this._getLocation}>
          <Text style={styles.btnText}><Icon size={18} name="navigate"> </Icon> Find my location</Text>
        </TouchableHighlight>
      </View>
		)
	}
})

const styles = StyleSheet.create({
  container:{
    alignItems: "center",
    paddingTop: 60
  },
  map:{
    width: Util.size.width,
    height: Util.size.height-120
  },
  btn:{
    backgroundColor:"#00a803",
    width: Util.size.width-80,
    height: 40,
    borderWidth:Util.pixel,
    borderColor: "#009302",
    borderRadius: 4,
    justifyContent:"center",
    marginTop:10
  },
  btnText:{
    textAlign:"center",
    fontSize:18,
    color:"#fff"
  },
});

module.exports = Day5;