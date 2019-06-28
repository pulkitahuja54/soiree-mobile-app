import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import Create from './screens/Create';
import Display from './screens/Display';
import Edit from './screens/Edit';

class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppNavigator = createStackNavigator({
  DisplayScreen: { screen: Display },
  CreationScreen: { screen: Create },
  EditScreen: { screen: Edit } 
},
{
  initialRouteName: "DisplayScreen"
});

export default createAppContainer(AppNavigator);