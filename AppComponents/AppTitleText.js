// https://medium.com/@moschan/style-inheritance-of-react-native-eca1c974f02b
import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

export default class AppTitleText extends Component {
  render() {
    return (
      <Text {...this.props} style={[styles.text, this.props.style]}>{this.props.children}</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
    color: 'darkgray',
    textAlign: 'justify',
  },
});
