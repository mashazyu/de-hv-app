import React, {Component} from 'react';
import {Modal, TouchableHighlight, View, Linking} from 'react-native';

import AppText from './AppText';
import AppButton from './AppButton';

export default class AppModal extends Component {

  constructor(props) {
    super(props);

    const {isVisible} =  this.props;

    this.state = {
      modalVisible: isVisible,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  getDisclaimer() {
    return (
      <AppText>
        Powered by
        <AppText
          textDecorationLine='underline'
          onPress={() => Linking.openURL('https://tech.yandex.com/dictionary/')}>
          Yandex.Dictionary
        </AppText>
      </AppText>
    );
  }

  getFullTranslation() {

    const {selection, translation} =  this.props;

    if (!translation) return (
      <View>
        <View style={{margin: '3%'}}>
          <AppText>Yandex has no idea</AppText>
        </View>
        {this.getDisclaimer()}
      </View>
    );
    console.log('/// translation ', translation);
    return (
      <View>
      {
        translation && translation.map(({text, pos, tr}, i) => {
          return (
            <View key={i} style={{margin: '3%'}}>
              <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <AppText style={{fontWeight: 'bold'}}>{text}</AppText>
                <AppText> {pos}</AppText>
              </View>
              <View style={{marginTop: '3%'}}>
                {
                  tr && tr.map(({text}, i) => <AppText key={i}> {text}</AppText>)
                }
              </View>
            </View>
          )
        })
      }
      {this.getDisclaimer()}
      </View>
    );
  }

  getShortTranslation() {

    const {selection, translation} =  this.props;
    const text = (translation) ? ` - ${translation[0].tr[0].text}` : ' - No idea, sorry';

    return (
      <AppText style={{textAlign: 'center'}}>
        <AppText style={{fontWeight: 'bold'}}>
          {selection}
        </AppText>
          {text}
      </AppText>
    );
  }

  render() {

    const {closeModal} =  this.props;
    const {modalVisible} = this.state;

    return (
      <View style={{marginTop: 10, marginBottom: 15}}>
        <Modal
          animationType='fade'
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
          >
          <View style={{marginTop: 10}}>
            {this.getFullTranslation()}
            <AppButton
              text='Alles klar!'
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}>
            </AppButton>
          </View>
        </Modal>

        <TouchableHighlight
          underlayColor='lightgray'
          onPress={() => {
            this.setModalVisible(true);
          }}>
          {this.getShortTranslation()}
        </TouchableHighlight>
      </View>
    );
  }
}
