import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import XMLParser from 'react-xml-parser';
import HTMLParser from 'cheerio-without-node-native';

import ItemView from './ItemView/ItemView';
import AppContainer from './AppComponents/AppContainer';
import AppLoader from './AppComponents/AppLoader';
import AppScrollView from './AppComponents/AppScrollView';

export default class PodcastList extends Component {

  static navigationOptions = ({ navigation }) => {
    const {params} = navigation.state;

    return {
      title: params ? params.name : 'Podcast',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      isLoading: false,
    };

  }

  componentWillMount() {

    this.setState({isLoading: true});

    const {url} = this.props.navigation.state.params;

    return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const xml = new XMLParser().parseFromString(data);
      const itemList = xml.getElementsByTagName("item");
      this.setState({itemList, isLoading: false});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  onPress(articleURL, audioURL, title) {

    this.props.navigation.navigate('Article', {articleURL, audioURL, title});

  }

  getValue(item, attrName) {

    let currentValue = item.children.find(i => i.name === attrName);

    if (currentValue) {
      currentValue = currentValue.value;
    } else {
      currentValue='';
    }

    return currentValue;
  }

  removeBrTag(string) {
    return string.replace(/<br(\s[a-z]+\=\"[a-z]+\")?\s\/>/g, '');
  }

  parseHTML(string) {
    const $ = HTMLParser.load(string, {normalizeWhitespace: true});
    return $.root().text();
  }

  correctLength(string) {
    return (string.length < 260) ? string : `${string.substr(0, 220)}...`;
  }

  returnItemList() {
    const {itemList} = this.state;

    return itemList.map((item, key) => {
      const artU = this.getValue(item, 'link');
      const audU = this.getValue(item, 'guid');

      let title = this.getValue(item, 'title');
      title = this.parseHTML(title);

      let description = this.getValue(item, 'description');
      description = this.removeBrTag(description);
      description = this.parseHTML(description);
      description = this.correctLength(description);

      return (
        <ItemView
          key={key}
          title={title}
          description={description}
          articleURL={artU}
          audioURL={audU}
          onPress={() => this.onPress.bind(this, artU, audU, title)}
        />
      );
    });
  }

  render() {
    const {itemList, isLoading} = this.state;

    return (
      <AppContainer>
        {(itemList.length > 0) && (!isLoading) &&
          <AppScrollView>
            {this.returnItemList()}
          </AppScrollView>}
        {(itemList.length === 0) && (isLoading) && <AppLoader />}
      </AppContainer>
    );
  }

}
