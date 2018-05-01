import React, { Component } from 'react';

import { View, ScrollView, Image, StyleSheet, Button, WebView, Platform } from 'react-native';

import HTMLView from 'react-native-htmlview';
import HTMLParser from 'cheerio-without-node-native';
import { Asset, Audio, Font, Video } from 'expo';

export default class ItemView extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

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
    };

    this.webView = null;

    this.onPress = this.onPress.bind(this);
    //this.onMessage = this.onMessage.bind(this);
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

  onMessage(event) {
    console.warn(event.nativeEvent.data. data);
    debugger;
  }

  componentWillMount() {

    const { articleURL } = this.props.navigation.state.params;

    if (articleURL) {
      fetch(articleURL)
      .then((response) => response.text())
      .then((htmlRaw) => {
        const $ = HTMLParser.load(htmlRaw, {normalizeWhitespace: true});

        const title = $('div[class=text]>h1').html();
        const subtitle = $('p[class=subtitle]').html();
        const text = $('div[class=articlemain]').html();

        this.setState({title, subtitle, text});
      })
      .catch((error) => {
        console.error(error);
      });
    }

  }

  render() {

    const { title, subtitle, text, isPlaying } = this.state;
    const article =
      `<head>
        ${htmlStyle}
      </head>
      <body>
        ${script}
        <div class="container">
          <h1>${title}</h1>
          <p class="subtitle">${subtitle}</p>
          ${text}
        </div>
      </body>`;

    console.warn(article);

    if (text) {
      return (
        <View style={styles.container}>

          <Button
            onPress={this.onPress}
            style={styles.button}
            title={isPlaying ? "Pause" : "Play"}
            color="darkgray"
          />

          <WebView
            ref={( webView ) => this.webView = webView}
            source={{html: article}} style={styles.webView}
            scalesPageToFit={(Platform.OS === 'ios') ? false : true}
            onMessage={this.onMessage}
          />

        </View>
      );
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

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  webView: {
    flex: 1,

  },
  button: {
    color: 'darkgray',
  },
  imageContainter: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const script = `
  <script>

    function getSelectedText() {
       var text = "";
       if (typeof window.getSelection != "undefined") {
           text = window.getSelection().toString();
       } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
           text = document.selection.createRange().text;
       }
       return text;
    }

    function returnSelectedText() {
       var selectedText = getSelectedText();
       if (selectedText) {
           window.postMessage( selectedText);
       }
    }

    document.onmouseup = returnSelectedText;
    document.onkeyup = returnSelectedText;

  </script>`
;

const htmlStyle = `<style>
  h1 {
    font-size: 25;
    font-family: sans-serif-thin;
    color: darkgray;
    margin-top: 20;
  }
  h3 {
    font-size: 20;
    font-family: sans-serif-thin;
    font-weight: bold;
    color: darkgray;
    margin-top: 20;
    margin-bottom: 20;
  }
  p {
    font-size: 17;
    font-family: sans-serif-thin;
    color: darkgray;
    margin-top: 20;
    line-height: 150%;
  }

  .container {
    margin: 20px;
    text-align: justify;
  }

  .overline {
    display: block;
    font-size: 23;
    font-family: sans-serif-thin;
    font-weight: bold;
    color: darkgray;
    margin-bottom: 20px;
  }

  .subtitle {
    font-style: italic;
  }
</style>`;
