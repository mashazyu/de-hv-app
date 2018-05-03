// https://medium.com/@moschan/style-inheritance-of-react-native-eca1c974f02b
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

export default class AppLoader extends Component {
  render() {
    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
        <Image source={require('../assets/_preloader.gif')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
