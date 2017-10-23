/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Image,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';

import Nav from './widgets/nav'
import SndNav from './widgets/sndNav' 

var {height, width} = Dimensions.get('window');
var image1 = require('../images/tasks.png')
var image2 = require('../images/tasks.png')
var image3 = require('../images/tasks.png')
var image4 = require('../images/tasks.png')
var image5 = require('../images/tasks.png')
var image6 = require('../images/tasks.png')
var image7 = require('../images/tasks.png')
var image8 = require('../images/tasks.png')
var image9 = require('../images/tasks.png')
var image10 = require('../images/tasks.png')
var image11 = require('../images/tasks.png')

// TODO REPLACE THIS FROM TWITTER 
var data = [{
  "id": 1,
  "first_name": "Gina",
  "last_name": "Hill",
  "tweet": "Phasellus sit ag lorem, vitae mattis elit.",
  "time": "9:48 AM",
  image: image1,
}, {
  "id": 2,
  "first_name": "Marta",
  "last_name": "Little",
  "tweet": "Vivamus tortor. D sollicitudin ut, suscipitique. Fusce con sed augue.",
  "time": "8:39 PM",
  image: image2,
}, {
  "id": 3,
  "first_name": "Christy",
  "last_name": "Powell",
  "tweet": "Integer pede justo, lacinia eget, tinciduntet, sem. Fusce consequat. Nulla nisl. Nunc n",
  "time": "8:01 AM",
  image: image3,
}, {
  "id": 4,
  "first_name": "Cynthia",
  "last_name": "Nichols",
  "tweet": "Donec quis orci eget orndimentum. Curabitur in libert. Nulla tempus.",
  "time": "3:36 AM",
  image: image4,
}, {
  "id": 5,
  "first_name": "Maria",
  "last_name": "Harrison",
  "tweet": "Ut at dolor quis odio consequat varius. Integer ac let ac nulla.",
  "time": "9:34 AM",
  image: image5
}, {
  "id": 6,
  "first_name": "Ana",
  "last_name": "Porter",
  "tweet": "Donec odit sapien arcu sed augue. Aliquam erat volutpat.",
  "time": "3:09 PM",
  image: image6
}, {
  "id": 7,
  "first_name": "Clara",
  "last_name": "Bennett",
  "tweet": "Mauris.",
  "time": "8:04 PM",
  image: image7
}, {
  "id": 8,
  "first_name": "Brenda",
  "last_name": "Rogers",
  "tweet": "ellentesque.",
  "time": "12:46 PM",
  image: image8
}, {
  "id": 9,
  "first_name": "Annie",
  "last_name": "Daniels",
  "tweet": "Phasellus sit ulla ac enim. In tempor, turpis nec euismod scelerisque, qt.",
  "time": "9:35 PM",
  image: image9
}, {
  "id": 10,
  "first_name": "Bri",
  "last_name": "Franklin",
  "tweet": "Nullanisi vulputate nonummy. Maecenas tincidunt lacusvelit. Vivamus rus.",
  "time": "11:22 AM",
  image: image10
}];

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var isLoading = true; 

function loadFirebaseData()
{
  isLoading = true;
  var firebaseDatabase = global.firebase.database();
  var firebaseData = firebaseDatabase.ref("tasks/");
  
  var arrayOfData = [];
  firebaseData.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
         //alert('At here');
         arrayOfData.push(childSnapshot);
      });

      alert(JSON.stringify(arrayOfData));
      
      // after done 
      var data = [{
          "id": 10,
          "first_name": "Bri",
          "last_name": "Franklin",
          "tweet": "Nullanisi vulputate nonummy. Maecenas tincidunt lacusvelit. Vivamus rus.",
          "time": "11:22 AM",
          image: image10
      }] 
  });
  
  //this.dataSource =  ds.cloneWithRows(firebaseData)
  isLoading = false;
}

var currenState = null;

export default class Discover extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(data),
      loading: false
    }
    
    this.state.loading = true; 
    loadFirebaseData();
  }
  
  eachTweet(x){
    return(
      <TouchableOpacity style={{width:width, height:90, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
      <Spinner
      visible={ isLoading }
      textContent={"Try to retrieve data from firebase..."}
      textStyle={{
      color: '#FFF'
      }}/>
      <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
      <Image source = {x.image} resizeMode="contain" style ={{height:54, width:54, borderRadius:27, margin:10}} />
      <View style={{flex:1}}>
      <View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
      <Text style={{fontWeight:'600', fontSize:12}}>{x.first_name} {x.last_name}</Text>
      <Text style={{fontWeight:'500', fontSize:12}}> | @{x.first_name}</Text>
      </View>
      <View style={{ margin:5, marginRight:10,}}>
      <Text style={{fontSize:13, color:'#444', fontWeight:'400'}}>{x.tweet}</Text>
      </View>
      </View>
      </View>
      </TouchableOpacity>
      )
  }
  render() {
    return (
      <View style={styles.container}>
      <Nav {...this.props} />
      
      <View style={{flexDirection:'row', alignItems:'flex-end', padding:10, borderBottomWidth:1, borderColor:'#e7e7e7'}}>
      <Text style={{fontWeight:'900', fontSize:20, color:'#333', marginBottom:-1 }}>TWEETS</Text>
      <TouchableOpacity><Text style={{fontSize:14, color:'#01addf', fontWeight:'400', marginLeft:10}}>ALL</Text></TouchableOpacity>
      <Text style={{fontSize:14, fontWeight:'400', color:'#888'}}>   /</Text>
      <TouchableOpacity><Text style={{fontSize:14, fontWeight:'400', color:"#555"}}>   NO REPLIES</Text></TouchableOpacity>
      </View>
      <ListView 
      dataSource = {this.state.dataSource}
      renderRow = {(rowData) => this.eachTweet(rowData)}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:null,
    width:null,

}}
);

// <SndNav {...this.props} />