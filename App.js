import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import PodcastList from './PodcastList';
import Article from './Article';

const RootStack = StackNavigator(
  {
    Home: {
      screen: PodcastList,
    },
    Article: {
      screen: Article,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'darkgray',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif-thin',
        fontSize: 20,
      },
    },
  }
);

export default class App extends Component {

  render() {
    return <RootStack />;
  }

}
