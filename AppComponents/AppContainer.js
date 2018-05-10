// https://medium.com/@moschan/style-inheritance-of-react-native-eca1c974f02b
import React, {Component} from 'react';
import {View, StatusBar, StyleSheet, Dimensons} from 'react-native';

export default class AppContainer extends Component {
  render() {
    return (
      <View {...this.props} style={[styles.appContainer, this.props.style]}>
        <StatusBar barStyle = "dark-content" hidden = {false}/>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
