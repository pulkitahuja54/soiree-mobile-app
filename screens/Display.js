import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList, Button } from 'react-native';

const URI = 'http://3.215.63.130/api/events/';

class Display extends Component {

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
   fetch('http://3.215.63.130/api/events')
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

  renderRow(item) {
       console.log("item", item.event_name);
      return (
      <View>
      <Text>{ item.event_name }  </Text>
      <Button onPress={() => this.props.navigation.navigate('EditScreen', { item: item})} title="Edit "/>
      <Button onPress={() => this.deleteData(item)} title="Delete" color = "red"  />
      </View>
      );
}

  render() 
  {  
    return (
      <View style={{ flex: 1,backgroundColor: 'white'}}>
        <Text style={{ alignItems: 'center',justifyContent: 'center',fontSize: 22 }} > Upcoming events  </Text>
        <FlatList
        data={this.state.dataSource}
        renderItem={({item}) =>this.renderRow(item)}
        keyExtractor = {item => item.id.toString()}
        refreshing = {this.state.refreshing}
        onRefresh = {this.handleRefresh}
        />
        <Button onPress={() => this.props.navigation.navigate('CreationScreen')} title="Create more events" color="green"/>
      </View>
  );
}

}
export default Display;