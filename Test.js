import React, { Component } from 'react';

import { View, Image, ScrollView, StyleSheet, Button, WebView, TouchableWithoutFeedback, Vibration, Text } from 'react-native';

import HTMLView from 'react-native-htmlview';
import HTMLParser from 'cheerio-without-node-native';
import { Asset, Audio, Font, Video } from 'expo';

import ModalWindow from './ModalWindow';
import AppContainer from './AppComponents/AppContainer';
import AppLoader from './AppComponents/AppContainer';
import AppText from './AppComponents/AppText';

const YandexURL = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20180416T105832Z.f4d83a6bdace48bc.58158ca3eacfe99c2170cd7f0253c21afb460de6&lang=de-en&text=';

export default class Test extends Component {


  render() {

  return (
    <AppContainer>
      <Text style={{flex:1}}> is loading </Text>
      <Image
        style={{flex:1}}
        //{...this.props} style={[styles.container, this.props.style]}
        source={require('./assets/_preloader.gif')}
      />
    </AppContainer>
  );

  }

}
