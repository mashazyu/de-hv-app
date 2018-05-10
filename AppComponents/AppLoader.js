// https://medium.com/@moschan/style-inheritance-of-react-native-eca1c974f02b
import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

export default class AppLoader extends Component {
  render() {
    return (
        <Image
          {...this.props} style={[styles.image, this.props.style]}
          resizeMode='contain'
          source={require('../assets/_preloader.gif')}
        />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    width: '100%',
  },
});
