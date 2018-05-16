// https://medium.com/@moschan/style-inheritance-of-react-native-eca1c974f02b
import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';

import AppTitleText from './AppTitleText';

export default class AppButton extends Component {
  render() {

    const {onPress, text} = this.props;

    return (
      <TouchableHighlight
        {...this.props}
        underlayColor='lightgray'
        style={[styles.button, this.props.style]}
        onPress={onPress}>
        <AppTitleText style={styles.text}>{text}</AppTitleText>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'darkgray',
    padding: '3%',
  },
  text: {
    color: 'white',
  }
});
