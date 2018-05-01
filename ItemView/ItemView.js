import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';

export default class ItemView extends Component {

  render() {

    const {title, description, articleURL, audioURL, onPress} = this.props;

    return (
      <View>
        <TouchableOpacity
          onPress={onPress(articleURL, audioURL, title)}
          >
          <View style={styles.container}>
            <Text style={styles.title}>
              {title}
            </Text>
             <Text style={styles.description}>
              {description}
            </Text>
          </View>
         </TouchableOpacity>
       </View>
     );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: 'white',
    padding: 30,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif-thin',
    fontSize: 20,
    color: 'darkgray',
    textAlign: 'justify',
  },
  description: {
    fontSize: 17,
    fontFamily: 'sans-serif-thin',
    color: 'darkgray',
    textAlign: 'justify',
    marginTop: 25,
  },
})
