// https://medium.com/@moschan/style-inheritance-of-react-native-eca1c974f02b
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class AppContainer extends Component {
  render() {
    return (
      <View {...this.props} style={[styles.container, this.props.style]}>{this.props.children}</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
