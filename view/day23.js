/**
 * Day 23
 * local webview
 * D3.js
 */
'use strict';

import React,{
  Component,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  Image,
  Text,
  View,
  WebView,
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

class Poincare extends Component{
  render() {
    return(
      <WebView
        automaticallyAdjustContentInsets={false}
        source={require('./public/demo1.html')}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />
    )
  }
}

class Sphere extends Component{
  render() {
    return(
      <WebView
        automaticallyAdjustContentInsets={false}
        source={require('./public/demo2.html')}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />
    )
  }
}

export default class extends Component{
  _show(index) {
    if (index) {
      this.props.navigator.push({
        title: "Sphere",
        component: Sphere,
        navigationBarHidden: false,
      })
    }else{
      this.props.navigator.push({
        title: "Poincare",
        component: Poincare,
        navigationBarHidden: false,
      })
    }
  }

  render() {
    return(
      <View style={styles.menu}>
        <TouchableHighlight style={styles.btn} onPress={() => this._show(0)}>
          <View>
            <Image source={require('./img/poincare.png')} style={styles.img}/>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Poincaré Disk</Text>
              <Icon style={styles.itemNav} name="ios-arrow-right" size={35}/>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.btn} onPress={() => this._show(1)}>
          <View>
            <Image source={require('./img/sphere.jpg')} style={styles.img}/>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Sphere</Text>
              <Icon style={styles.itemNav} name="ios-arrow-right" size={35}/>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  itemWrapper:{
    backgroundColor: '#f3f3f3'
  },
  menu:{
    paddingTop:80,
  },
  btn:{
    height: 100,
    marginBottom:20,
    width:375,
  },
  img:{
    height:100,
    width:375,
    resizeMode:"cover",
  },
  textContainer:{
    height:100,
    width:375,
    position:"absolute",
    top:0,
    left:0,
    backgroundColor:"rgba(0,0,0,0.3)",
    justifyContent:"center",
  },
  text:{
    color:"#fff",
    fontSize:25,
    fontWeight:"500",
    paddingLeft:20,
  },
  itemNav:{
    color:"#fff",
    position:"absolute",
    right:20,
    top:32
  }
});

