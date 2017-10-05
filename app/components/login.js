/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Navigator,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';


import * as firebase from "firebase";

firebase.initializeApp({apiKey: "AIzaSyDLri7EnR54IB87XlDy3ZH13mUB7Fm5R7Y", authDomain: "task-shares.firebaseapp.com", databaseURL: "https://task-shares.firebaseio.com/", storageBucket: "gs://task-shares.appspot.com"});


import Button from './widgets/button';

var {height, width} = Dimensions.get('window');

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
    }
  }
    
 async twitterLogin() {

    // executed in separated thread
    const provider = firebase.auth.TwitterAuthProvider.credential('298627961-rv6owYcGlhS34zCThvvOtmBLxm2tSOI6awYc8E8E', 'xGTP9r6ExoGdImTAISvGV4VHwddqX8waNCdiEqG3i0n9n');
    const navigator = this.props.navigator;
    await firebase
      .auth()
      .signInWithCredential(provider)
      .then(function (firebaseUser) {
        alert("Successfully Login Using Firebase Authentication Service" + JSON.stringify(firebaseUser));

        navigator.push({
           id: 'home'
       })
      })
      .catch(function (error) {
        alert("Failed To Login " + error);
      });
  }

  render() {
    return (
      <Image style={styles.container} resizeMode="stretch" source={require('../images/party.jpg')}>
      <View style={{flex:8, alignItems:'flex-end', justifyContent:'center'}}>
      <View style={{width:((width/2) + 40), padding:5, borderTopLeftRadius:40, borderBottomLeftRadius:40, flexDirection:'row', backgroundColor:'rgba(0,0,0,0.5)', alignItems:'center'}}>
      <TouchableOpacity style={styles.circle}>
      <Image source={require('../images/bird.png')} resizeMode="contain" style={{height:30, width:30}} />
      </TouchableOpacity>
      <Text style={{color:'#fff', fontSize:19, margin:12}}>Get Started</Text>
      </View>
      <Image source={require('../images/icon.png')} resizeMode="contain" style={{height:50, width:110, margin:20, alignSelf:'center'}} />
      </View>
      <View alignItems="center">
       <TextInput
        style={styles.textinput}
        onChangeText={(text) => this.setState({email: text})}
        value={this.state.email}
        placeholder={"Email Address"}
        placeholderTextColor="white"/>
       <TextInput
        style={styles.textinput}
        onChangeText={(text) => this.setState({password: text})}
        value={this.state.password}
        secureTextEntry={true}
        placeholder={"Password"}
        placeholderTextColor="white"/>
       </View> 
       <Button
        text = "login"
        onpress={this.twitterLogin.bind(this)}
        button_styles={styles.primary_button}/>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:null,
    width:null,
    backgroundColor: '#F5FCFF',
  },
  circle:{
    backgroundColor:'rgba(85,172,239,0.2)',
    height:60,
    width:60,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  primary_button: {
    margin: 10,
    padding: 15,
    alignItems:'center',
    backgroundColor: 'rgba(85,172,239,0.3)'
  },  
  textinput: {
    margin: 10,
    height: 40, 
    width: 300,
    color : 'white',
    backgroundColor: 'rgba(85,172,239,0.2)',
    borderWidth: 1
  }
});

