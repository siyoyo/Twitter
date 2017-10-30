/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {twitter} from 'react-native-simple-auth';
import Spinner from 'react-native-loading-spinner-overlay';
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

var firebaseConfig = {
  apiKey: "AIzaSyDLri7EnR54IB87XlDy3ZH13mUB7Fm5R7Y",
  authDomain: "task-shares.firebaseapp.com",
  databaseURL: "https://task-shares.firebaseio.com/",
  storageBucket: "gs://task-shares.appspot.com"
}

firebase.initializeApp(firebaseConfig);

// set it as global variable and call it at another windows
// since firebase is static we can then pass it easyly into global 
global.firebase = firebase;
global.firebaseDatabase = firebase.database();

import Button from './widgets/button';

var {height, width} = Dimensions.get('window');

var firebaseUserGlobal = null;

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      loading: false
    }
  }

  async firebaseLogin()
  {
    var state = this.state;

    state.loading = true;
    parent = this;
    if (this.state.email != null && this.state.password != null) {
      // convert to lower case and eliminate space
      this.state.email = this.state.email.toLowerCase().trim();
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function (firebaseUser) {
           firebaseUserGlobal = firebaseUser;
           parent.goToLogin(parent) 
        })
        .catch(function (error) {
          alert(error.message)
        });
    } else {
      alert("Please fill username and password");
    }

    state.loading = false;
  }

  goToLogin(theParent) 
  {
    theParent.state.loading = false;
    this.setState( { firebaseUser : global.firebaseUser  } );
    theParent.props.navigator.push({id: 'home', props : { firebaseUser :  firebaseUserGlobal } })
  }

  render() {
    return (
      <Image
        style={styles.container}
        resizeMode="stretch"
        source={require('../images/party.jpg')}>
        <Spinner
          visible={this.state.loading}
          textContent={"Try to login..."}
          textStyle={{
          color: '#FFF'
        }}/>
        <View
          style={{
          flex: 8,
          justifyContent: 'center'
        }}>
          <Image
            source={require('../images/icon.png')}
            resizeMode="contain"
            style={{
            height: 50,
            width: 110,
            margin: 20,
            alignSelf: 'center'
          }}/>
        </View>
        <View style={{
          flex: 8,
          alignItems: 'center',
          alignSelf : 'center',
          flexDirection : 'column',
          justifyContent: 'center'
        }}>
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
        <View
          style={{
          alignSelf: 'center',
          width: ((width / 2) + 40),
          padding: 5,
          paddingLeft: 50,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          flexDirection: 'row',
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center'
        }}>
          <TouchableOpacity
            style={styles.circle}
            onPress={this
            .firebaseLogin
            .bind(this)}>
            <Image
              source={require('../images/bird.png')}
              resizeMode="contain"
              style={{
              height: 30,
              width: 30
            }}/>
          </TouchableOpacity>
          <Text
            style={{
            color: '#fff',
            fontSize: 19,
            margin: 12
          }}>Login</Text>
        </View>
      </Image>
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  twitterLoginDoesntWork()
  {
    var twitterDat = {
      appId: 'UNBnxyw1qlrwwmLSzbYsp30jV',
      appSecret: 'sltYCauxb7yRNU8cUXMXkaKp9pRA6lWNVMifpxueXhBtBruipz',
      callback: 'testapp://authorize'
    }

    twitter({appId: twitterDat.appId, appSecret: twitterDat.appSecret, callback: twitterDat.callback}).then((info) => {
      // info.user - user details from the provider info.credentials - tokens from the
      // provider
      alert('Succeed ' + JSON.stringify(info));
    }).catch((error) => {
      // error.code error.description
      alert('Error ' + JSON.stringify(error));
    });
  }

  async twitterLoginDangerousWay() {
    //executed in separated thread
    const provider = firebase
      .auth
      .TwitterAuthProvider
      .credential('298627961-rv6owYcGlhS34zCThvvOtmBLxm2tSOI6awYc8E8E', 'xGTP9r6ExoGdImTAISvGV4VHwddqX8waNCdiEqG3i0n9n');

    const navigator = this.props.navigator;
    await firebase
      .auth()
      .signInWithCredential(provider)
      .then(function (firebaseUser) {
        alert("Successfully Login Using Firebase Authentication Service" + JSON.stringify(firebaseUser));
        navigator.push({id: 'home'})
      })
      .catch(function (error) {
        alert("Failed To Login " + error);
      });
  }
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    backgroundColor: '#F5FCFF'
  },
  circle: {
    backgroundColor: 'rgba(85,172,239,0.2)',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  primary_button: {
    margin: 10,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(85,172,239,0.3)'
  },
  textinput: {
    margin: 10,
    height: 40,
    width: 300,
    paddingLeft : 20,
    color: 'white',
    backgroundColor: 'rgba(85,172,239,0.2)',
    borderWidth: 1
  }
});
