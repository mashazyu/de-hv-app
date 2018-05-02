import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';

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

    const {translation, closeModal} =  this.props;
    const {modalVisible} = this.state;

    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {}}
          onBackButtonPress={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>{translation}</Text>

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
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
