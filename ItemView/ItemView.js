import React, { Component } from 'react';

import AppText from '../AppComponents/AppText';
import AppTile from '../AppComponents/AppTile';

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

export default class ItemView extends Component {

  render() {

    const {title, description, articleURL, audioURL, onPress} = this.props;

    return (
      /*<View>
        <TouchableOpacity
          onPress={onPress(articleURL, audioURL, title)}
          >
          <View style={styles.container}>
            <AppText style={styles.title}>
              {title}
            </AppText>
             <AppText>
              {description}
            </AppText>
          </View>
         </TouchableOpacity>
       </View>*/
       <AppTile
        name={title}
        style={styles.tile}
        description={description}
        onPress={onPress(articleURL, audioURL, title)}
      >
      </AppTile>
     );
 }
}

const styles = StyleSheet.create({
  tile: {
    width: '85%',
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
  },
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
});
