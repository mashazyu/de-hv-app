import React, {Component} from 'react';

import {StyleSheet, FlatList} from 'react-native';

import AppContainer from './AppComponents/AppContainer';
import AppTile from './AppComponents/AppTile';
import PodcastList from './PodcastList';

import {podcastsDLF} from './assets/podcasts';

export default class PodcastsOverview extends Component {

  static navigationOptions = {
    title: 'Podcasts',
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress(name) {
    const {url} = podcastsDLF.find(podcast => (podcast.name === name));

    this.props.navigation.navigate('PodcastList', {name, url});
  }

  render() {

    return (
      <AppContainer>

        <FlatList
          data={podcastsDLF}
          numColumns={2}
          style={styles.list}
          bounces={true}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => <AppTile name={item.name} onPress={this.onPress}></AppTile>} />

      </AppContainer>
    )

  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
});
