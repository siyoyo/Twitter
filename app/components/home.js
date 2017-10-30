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
var taskImage = require('../images/tasks.png')

var data = [];
var user = null;

export default class Discover extends Component {

  constructor(props){
    super(props)
 
    // must be declared
    this.state = {
      loading: true, 
      loaded : false
    }
  }

  componentWillMount() 
  {
    user = this.props.firebaseUser;
    this.writeUserData(user.uid, user.email, 'Clean rest room', '30/10/2017', '08:00', taskImage);
    this.loadFirebaseData();
  }
   
  // Causing error on render
  // componentDidMount() 
  // {
  //   this.state = {
  //     dataSource: ds.cloneWithRows(data),
  //     loading: true, 
  //     loaded : true
  //   }
  // }

  writeUserData(userId, email, description, date, time, imageLocation) {
    firebase.database().ref('tasks/' + user.uid).push({
      image : imageLocation,
      description : description,
      email : email,
      date : date,
      time : time
    });
  }

  loadFirebaseData()
  {
    this.state.loading = true;
    var firebaseDatabase = global.firebase.database();
    var firebaseData = firebaseDatabase.ref('tasks/' + user.uid);
    
    var parent = this; 

    firebaseData.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        data.push(childSnapshot);
      });

      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      parent.state = {
        dataSource: ds.cloneWithRows(data),
        loading: false, 
        loaded : true
      }
      //NEED TO FORCE UPDATE THE UI >> STUPID! 
      parent.forceUpdate();    
    });
  }
  
  eachTweet(x){
    return(
      <TouchableOpacity style={{width:width, height:90, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
        <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
           <Image source = {x.image} resizeMode="contain" style ={{height:54, width:54, borderRadius:27, margin:10}} />
         <View style={{flex:1}}>
           <View style={{ flexDirection:'column', marginLeft:5, marginTop:5, alignItems:'center'}}>
               <Text style={{fontWeight:'600', fontSize:12}}>Assigned To: {x.email}</Text>
               <Text style={{fontWeight:'500', fontSize:12}}>Description: {x.description}</Text>
           </View>
           <View style={{ margin:5, marginRight:10,}}>
              <Text style={{fontSize:13, color:'#444', fontWeight:'400'}}>When: {x.date} - { x.time }</Text>
           </View>
         </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    if(!this.state.loaded)
    { 
         return(
           <View style={styles.container}>
           <View style={{flexDirection:'row', alignItems:'flex-end', padding:10, borderBottomWidth:1, borderColor:'#e7e7e7'}}>
               <Spinner
                  visible={ this.state.loading }
                  textContent={"Try to retrieve data from firebase..."}
                  textStyle={{
                  color: '#FFF'
           }}/>
           <Text> Loading ... </Text>
          </View>
          </View> 
    )
    }
    else { 
      return (
      <View style={styles.container}>
      <Nav {...this.props} />
      <View style={{flexDirection:'row', alignItems:'flex-end', padding:10, borderBottomWidth:1, borderColor:'#e7e7e7'}}>
        <Text style={{fontWeight:'900', fontSize:20, color:'#333', marginBottom:-1 }}>TWEETS</Text>
        <TouchableOpacity><Text style={{fontSize:14, color:'#01addf', fontWeight:'400', marginLeft:10}}>ALL</Text></TouchableOpacity>
        <Text style={{fontSize:14, fontWeight:'400', color:'#888'}}>   /</Text>
        <TouchableOpacity>
          <Text style={{fontSize:14, fontWeight:'400', color:"#555"}}>   NO REPLIES
          </Text>
        </TouchableOpacity>
      </View>
      <ListView 
        dataSource = {this.state.dataSource}
        renderRow = {(rowData) => this.eachTweet(rowData)}
      />
      </View>
    );
   }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:null,
    width:null
  }}
);
