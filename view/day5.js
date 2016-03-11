/**
 * Day 5
 * find my location
 */
'use strict';

var React = require('react-native');
var {
  Image,
  MapView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var Util = require('./utils');
var Icon = require('react-native-vector-icons/Ionicons');

var Map = React.createClass({
  getInitialState: function () {
    return{
      isFirstLoad: true,
      mapRegion: undefined,
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
  _onRegionChangeComplete: function(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  },
  render: function () {
    return(
      <View>
        <MapView
          style={this.props.mapStyle} 
          mapType = {this.props.mapType}
          showsUserLocation={this.props.showsUserLocation}
          followUserLocation={this.props.followUserLocation}
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
        <Map mapTyle="standard" mapStyle={styles.map} showsUserLocation={this.state.showGeo} followUserLocation={this.state.showGeo}></Map>
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

module.exports = {
    Day5: Day5,
    map: Map
}