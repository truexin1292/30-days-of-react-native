/**
 * Day 10
 * 
 */
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  StatusBarIOS,
  Animated,
  Easing,
  View
} = React;
const Util = require('./utils');
const { BlurView, VibrancyView } = require('react-native-blur');

var Day9 = React.createClass({
  getInitialState: function () {
    return{
      shift: new Animated.Value(-120),
      show:false,
    }
  },
  _pushMenu: function () {
    this.setState({
      show: true,
    })
    Animated.timing(         
       this.state.shift,    
       {toValue: 50,
        duration: 200,
        delay:100,
        easing: Easing.elastic(1),
      },          
    ).start();
  },
  _popMenu: function () {
    Animated.timing(         
       this.state.shift,    
       {toValue: -120,
        duration: 200,
        delay:100,
        easing: Easing.elastic(1),
      },          
    ).start();
    setTimeout(()=>{
      this.setState({
        show: false,
      })
    },500);
  },
  componentDidMount: function () {
    StatusBarIOS.setStyle(1);
  },
  render: function () {
    return(
      <View style={{backgroundColor:"#37465c"}}>
        <TouchableWithoutFeedback style={styles.imgContainer} onPress={this._pushMenu}>
          <Image source={require('./img/tumblr.png')} style={styles.img}></Image>
        </TouchableWithoutFeedback>
        {this.state.show?
        <Image source={require('./img/tumblr.png')} style={styles.menu}>
          <BlurView blurType="dark" style={styles.blur}>
            <Animated.View style={[styles.menuItem1,{left:this.state.shift}]}>
              <Image style={styles.menuImg} source={require('./img/tumblr-text.png')}></Image>
              <Text style={styles.menuText}>Text</Text>
            </Animated.View>
            <Animated.View style={[styles.menuItem2,{right:this.state.shift}]}>
              <Image style={styles.menuImg} source={require('./img/tumblr-photo.png')}></Image>
              <Text style={styles.menuText}>Photo</Text>
            </Animated.View>
            <Animated.View style={[styles.menuItem3,{left:this.state.shift}]}>
              <Image style={styles.menuImg} source={require('./img/tumblr-quote.png')}></Image>
              <Text style={styles.menuText}>Quote</Text>
            </Animated.View>
            <Animated.View style={[styles.menuItem4,{right:this.state.shift}]}>
              <Image style={styles.menuImg} source={require('./img/tumblr-link.png')}></Image>
              <Text style={styles.menuText}>Link</Text>
            </Animated.View>
            <Animated.View style={[styles.menuItem5,{left:this.state.shift}]}>
              <Image style={styles.menuImg} source={require('./img/tumblr-chat.png')}></Image>
              <Text style={styles.menuText}>Chat</Text>
            </Animated.View>
            <Animated.View style={[styles.menuItem6,{right:this.state.shift}]}>
              <Image style={styles.menuImg} source={require('./img/tumblr-audio.png')}></Image>
              <Text style={styles.menuText}>Audio</Text>
            </Animated.View>
            <TouchableWithoutFeedback onPress={this._popMenu}><Text style={styles.dismiss}>NeverMind</Text></TouchableWithoutFeedback>
          </BlurView>
          </Image>:
          <View></View>
        }
      </View>
    )
  }
})

const styles = StyleSheet.create({
  imgContainer:{
    height: Util.size.height,
    width: Util.size.width,
    position:"absolute",
    top:0,
    left:0
  },
  img:{
    resizeMode:"contain",
    height: Util.size.height-10,
    width: Util.size.width,
    marginTop:15
  },
  menu:{
    height: Util.size.height,
    width: Util.size.width,
    resizeMode:"contain",
    position:"absolute",
    top:0,
    left:0
  },
  blur:{
    height: Util.size.height,
    width: Util.size.width,
  },
  menuImg:{
    width:120,
    height:100,
    resizeMode:"contain",
  },
  menuText:{
    width:120,
    textAlign:"center",
    color:"#fff"
  },
  menuItem1:{
    position:"absolute",
    left: 50,
    top: 80
  },
  menuItem3:{
    position:"absolute",
    left: 50,
    top: 250
  },
  menuItem5:{
    position:"absolute",
    left: 50,
    top: 420
  },
  menuItem2:{
    position:"absolute",
    right: 50,
    top: 80
  },
  menuItem4:{
    position:"absolute",
    right: 50,
    top: 250
  },
  menuItem6:{
    position:"absolute",
    right: 50,
    top: 420
  },
  dismiss:{
    position:"absolute",
    width:Util.size.width,
    left:0,
    bottom:50,
    textAlign:"center",
    color:"rgba(255,255,255,0.2)",
    fontWeight:"700"
  }
});

module.exports = Day9;