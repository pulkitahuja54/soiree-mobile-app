import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';

const URI = 'http://100.27.29.162/api/events/';
const { height, width } = require("Dimensions").get("window");


class Display extends Component {
 static navigationOptions = {
 headerTitleStyle: { alignSelf: 'center' },
    title: 'Soiree Events',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontStyle: 'italic',
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      fontSize: 30,
      textAlign:"center", 
      flex:1, 
    },
  };
  constructor(props)
  {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      refreshing: false,
    };
  }

  componentDidMount() 
  {
   this.makeRequest();
  }

makeRequest = () =>
{
   fetch('http://100.27.29.162/api/events')
    .then(response => response.json())    
    .then((responseJson)=> {
      console.log(responseJson);
      this.setState({
        loading: false,
        dataSource: responseJson,
        refreshing: false,
      })
    })
    .catch(error=>console.log(error))
}

handleRefresh = () => {
    this.setState({
        refreshing: true,
    }, () => {
        this.makeRequest();
    })
}

deleteData(item){
        fetch( URI + item.id , {
    method: 'delete'
  }).then(response =>
    response.json().then(json => {
      return json;
    })
    .catch(error=>console.log(error))
  );
   alert('Event successfully deleted');
}

 
FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }


  renderRow(item) {
       console.log("item", item.event_name);
      return (
      <View>
      <Text>{ item.event_name }  </Text>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() =>  this.props.navigation.navigate('EditScreen', { item: item})}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle1}
                onPress={() =>  this.deleteData(item)}>
                <Text>Delete</Text>
            </TouchableOpacity>                  
      </View>
      );
}

  render() 
  {  
    return (
      <View style={ styles.viewStyle}>
        <FlatList
        data={this.state.dataSource}
        renderItem={({item}) =>this.renderRow(item)}
        keyExtractor = {item => item.id.toString()}
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        refreshing = {this.state.refreshing}
        onRefresh = {this.handleRefresh}
        />
            <TouchableOpacity
                style={styles.buttonStyle2}
                onPress={() =>  this.props.navigation.navigate('CreationScreen')}>
                <Text>Create more events</Text>
            </TouchableOpacity>
      </View>
  );
}

}
export default Display;

const styles = StyleSheet.create({

viewStyle: {
            flex: 1,
            backgroundColor: 'white',
            paddingBottom: 10,
            marginLeft: 20,
            marginRight: 20,
            justifyContent: "center",
            alignItems:'center',
            },
buttonStyle: {
            height: 50,
            width: width - 20,
            alignItems: 'center',
            backgroundColor: '#87CEEB',
            justifyContent: "center",
        },
buttonStyle1: {
            height: 50,
            width: width - 20,
            alignItems: 'center',
            backgroundColor: 'red',
            justifyContent: "center",
        },
buttonStyle2: {
            height: 50,
            width: width - 20,
            alignItems: 'center',
            backgroundColor: 'green',
            justifyContent: "center",
        },
      });