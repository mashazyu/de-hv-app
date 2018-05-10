import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

import PodcastList from './PodcastList';
import PodcastsOverview from './PodcastsOverview';
import Article from './Article';

const RootStack = StackNavigator(
  {
    Home: {
      screen: PodcastsOverview,
    },
    PodcastList: {
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
      },
    },
  }
);

export default class App extends Component {

  render() {
    return <RootStack />;
  }

}
