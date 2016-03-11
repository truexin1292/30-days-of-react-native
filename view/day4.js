/**
 * Day 4
 * bridge to cocoapods
 */
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  TouchableHighlight,
  View
} = React;

var ShowImg = React.createClass({
  componentDidMount: function() {
    React.NativeModules.JTSImagePreview.showImage('http://i.imgur.com/sKh7Z6R.png');
  },
  render: function () {
    return(
      <View></View>
    )
  }
})

var Day4 = React.createClass({
  getInitialState:function () {
    return{
      show:false
    }
  },
  _onImgPress: function () {
    this.setState({
      show:false
    })
    this.setState({
      show:true
    })
  },
  render: function () {
    var show = this.state.show?<ShowImg></ShowImg>:<View></View>;
    return(
      <View style={{marginTop:100, alignItems:"center"}}>
        <TouchableHighlight onPress={this._onImgPress}>
          <Image source={{uri:'http://i.imgur.com/sKh7Z6R.png'}} style={styles.img}></Image>
        </TouchableHighlight>
        {show}
      </View>
    )
  }
})

const styles = StyleSheet.create({
  img:{
    height: 200,
    width: 300
  }
});

module.exports = Day4;