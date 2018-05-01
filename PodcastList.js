import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, View } from 'react-native';
import XMLParser from 'react-xml-parser';
import HTMLParser from 'cheerio-without-node-native';

import ItemView from './ItemView/ItemView';

export default class PodcastList extends Component {

  static navigationOptions = {
    title: 'Podcasts',
  };

  constructor(props) {

    super(props);
    this.state = {
      itemList: []
    };

  }

  componentWillMount() {

    return fetch('http://www.deutschlandfunk.de/podcast-deutschlandfunk-der-tag.3417.de.podcast.xml')
    .then((response) => response.text())
    .then((data) => {
      const xml = new XMLParser().parseFromString(data);
      const itemList = xml.getElementsByTagName("item");
      this.setState({itemList});
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

  returnItemList() {

    const {itemList}=this.state;

    if (itemList.length>0) {
      return itemList.map((item, key) => {
        const artU = this.getValue(item, 'link');
        const audU = this.getValue(item, 'guid');

        let title = this.getValue(item, 'title');
        title = this.parseHTML(title);

        let description = this.getValue(item, 'description');
        description = this.removeBrTag(description);//description.replace(/<br(\s[a-z]+\=\"[a-z]+\")?\s\/>/g, '');//remove <br />
        description = this.parseHTML(description);

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
    } else {
      return (
        <View style={styles.imageContainter}>
          <Image

            source={{uri: 'https://media.giphy.com/media/WFaqdvA0lS8fu/giphy.gif'}}
          />
        </View>
      );
    }

  }

  render() {

    return (
      <ScrollView style={styles.container}>
        {this.returnItemList()}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  imageContainter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})
