import React, {Component} from 'react';

import {View, ScrollView, StyleSheet, Button, Vibration} from 'react-native';

import HTMLView from 'react-native-htmlview';
import HTMLParser from 'cheerio-without-node-native';
import {Audio} from 'expo';

import ModalWindow from './ModalWindow';
import AppContainer from './AppComponents/AppContainer';
import AppLoader from './AppComponents/AppLoader';
import AppText from './AppComponents/AppText';
import AppScrollView from './AppComponents/AppScrollView';


import wWStyles from './assets/wWStyles';
const YandexURL = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20180416T105832Z.f4d83a6bdace48bc.58158ca3eacfe99c2170cd7f0253c21afb460de6&lang=de-en&text=';

export default class Article extends Component {

  static navigationOptions = ({ navigation }) => {
    const {params} = navigation.state;

    return {
      title: params ? params.title : 'Article',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      text: '',
      sound: undefined,
      isPlaying: false,
      positionMillis: 0,
      isModalVisible: false,
      translation: '',
      selection: '',
      isLoading: false,
    };

    this.onPress = this.onPress.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.setTranslation = this.setTranslation.bind(this);
  }

  async onPress() {

    const {audioURL} = this.props.navigation.state.params;
    const {isPlaying, sound, positionMillis} = this.state;

    if (isPlaying) {
      sound.setStatusAsync({shouldPlay: false});
      const {positionMillis} = await sound.getStatusAsync();
      this.setState({isPlaying: false, positionMillis});
    } else {
      this.setState({isPlaying: true});
      if (sound !== undefined) {
        sound.setStatusAsync({shouldPlay: true, positionMillis});
      } else {
        const {sound} = await Expo.Audio.Sound.create(
            {uri: audioURL},
            {shouldPlay: true}
        );
        this.setState({sound});
      }
    }

  }

  setTranslation(translation) {
    this.setState({ isModalVisible: true, translation });
  }

  getTranslation(def, selection) {
    return def.length && def[0].tr.length
      ? `${def[0].tr[0].text}`
      : `Yandex has no idea :(`;
  }

  onSelect(selection) {

    Vibration.vibrate(100);
    this.setState({selection});

    fetch(`${YandexURL}${selection}`)
      .then((response) => response.json())
      .then(({def}) => this.getTranslation(def, selection))
      .then(this.setTranslation)
      .catch(this.setTranslation);
  }

  removeSymbols(word) {
    let updatedWord;

    // process to plain text
    const $ = HTMLParser.load(word);
    updatedWord = $.root().text();

    // remove ,."",''
    updatedWord = updatedWord.replace(/[,\.?!"':;<>]/gim, '');

    return updatedWord;

  }

  addLinks(html) {

    if (html) {
      const htmlArray = html.split(' ');

      const htmlArrayWithLinks = htmlArray.map(word => {
        const ref = this.removeSymbols(word);
        return `<a href="${ref}">${word}</a>`;
      });

      return htmlArrayWithLinks.join(' ');
    } else {
      return 'This article is empty :(';
    }

  }

  componentWillMount() {

    const { articleURL, title } = this.props.navigation.state.params;

    this.setState({isLoading: true});

    if (articleURL) {
      fetch(articleURL)
      .then((response) => response.text())
      .then((htmlRaw) => {
        const $ = HTMLParser.load(htmlRaw, {normalizeWhitespace: true});
        //title = this.addLinks(title);
        //const title = $('div[class=text]>h1').html();
        const subtitle = this.addLinks($('p[class=subtitle]').html());
        const text = $('div[class=articlemain]').html();

        this.setState({title, subtitle, text, isLoading: false});
      })
      .catch((error) => {
        this.setState({text: JSON.stringify(error), isLoading: false});
        //console.error(error);
      });
    }

  }

  closeModal() {
    this.setState({isModalVisible: false});
  }

  render() {

    const { title, subtitle, text, isPlaying, translation, isModalVisible, selection, isLoading } = this.state;
    const article =
      `<div class="article">
        <h1>${title}</h1>
        <p class="subtitle">${subtitle}</p>
        ${text}
      </div>`;

    return (
      <AppContainer>

        {(isLoading) && <AppLoader />}
        {(!isLoading) && (<View>
            <Button
              onPress={this.onPress}
              color="darkgray"
              title={isPlaying ? "Pause" : "Play"}
            />
            <AppScrollView style={styles.container}>
              <HTMLView
                value={article}
                stylesheet={wWStyles}
                onLinkPress={this.onSelect}
                onLinkLongPress={this.onSelect}
              />
            </AppScrollView>
            <ModalWindow
              translation={translation}
              selection={selection}
              isVisible={isModalVisible}
              closeModal={this.closeModal}
            />
          </View>)}

      </AppContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
