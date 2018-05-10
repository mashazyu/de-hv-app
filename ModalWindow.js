import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';

import AppText from './AppComponents/AppText';

export default class ModalWindow extends Component {

  constructor(props) {
    super(props);

    const {translation, isVisible, closeModal} =  this.props;

    this.state = {
      modalVisible: isVisible,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {

    const {selection, translation, closeModal} =  this.props;
    const {modalVisible} = this.state;

    console.log('///modalVisible', modalVisible);

    return (
      <View style={{marginTop: 10, marginBottom: 15}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
          >
          <View style={{marginTop: 10}}>
            <View>
              <AppText style={{textAlign: 'center'}}>
                <AppText style={{fontWeight: 'bold'}}>
                  {selection}
                </AppText>
                 - {translation}
              </AppText>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>
                <Text>Alles klar!</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <AppText style={{textAlign: 'center'}}>
            <AppText style={{fontWeight: 'bold'}}>
              {selection }
            </AppText>
             - {translation}
          </AppText>
        </TouchableHighlight>
      </View>
    );
  }
}
