// https://medium.com/@moschan/style-inheritance-of-react-native-eca1c974f02b
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import AppTitleText from './AppTitleText';
import AppText from './AppText';

export default class AppTile extends Component {

  render() {

    const {name, description, onPress} = this.props;

    return (
      <View {...this.props} style={[styles.tile, styles.elevationLow, this.props.style]}>
        <TouchableOpacity onPress={() => onPress(name)}>
          <AppTitleText style={styles.text}>{name}</AppTitleText>
          <AppText>{description}</AppText>
        </TouchableOpacity>
      </View>
    )
  }
}

const { height } = Dimensions.get("window");
const margin = height*0.03;

const styles = StyleSheet.create({
  tile: {
    aspectRatio: 10 / 10,
    backgroundColor: 'white',
    marginTop: '1.5%',
    marginBottom: '1.5%',
    marginLeft: '3%',
    padding: margin,
    width: '45%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elevationLow: { //https://stackoverflow.com/questions/46971206/how-to-add-shadow-around-the-image-in-react-native
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text: {
    marginBottom: '2.5%',
    textAlign: 'center',
  },
});
