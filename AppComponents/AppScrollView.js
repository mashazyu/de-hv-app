// https://medium.com/@moschan/style-inheritance-of-react-native-eca1c974f02b
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';



export default class AppScrollView extends Component {
  render() {
    return (
      <ScrollView
        {...this.props}
        contentContainerStyle={[styles.scrollView, this.props.style]}
        bounces={true}
        >
        {this.props.children}
      </ScrollView>
    )
  }
}

const { height, width } = Dimensions.get("window");
const contentHeight = height*1.2;
const marginVertical = height*0.07;
const marginHorizontal = width*0.04;

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    alignItems: 'center',
  },
});
