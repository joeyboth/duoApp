import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Button from './Button';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Feather';
var screen = Dimensions.get('window');

export default class SelectCameraOptions extends Component {
  render() {
    return (
      <Modal
        backdropOpacity={0.3}
        coverScreen
        animationDuration={150}
        isOpen={this.props.modal}
        onClosed={this.props.close}
        style={[styles.modal]}
        position={'bottom'}>
        <View
          style={{
            right: 10,
            top: 10,
            padding: 8,
            zIndex: 9999,
            borderRadius: 50,
            backgroundColor: '#ebebeb',
            alignSelf: 'flex-end',
          }}>
          <TouchableOpacity onPress={this.props.close}>
            <Icon name={'x'} solid size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: screen.width,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: -27,
            flex: 1,
          }}>
          <Text style={styles.modalTitle}>{this.props.title}</Text>



<View style={styles.bodInputContainer}>
            <Button
              onPress={this.props.firstButtonFunction}
              title={this.props.firstButtonName}
              backgroundColor={'#000'}
              textColor={'#fff'}
              marginBottom={1}
            />
            <Button
              onPress={this.props.secondButtonFunction}
              title={this.props.secondButtonName}
              backgroundColor={'#000'}
              textColor={'#fff'}

            />   

          </View>

        </View>
        <StatusBar
          backgroundColor="rgba(0,0,0,0.3)"
          barStyle="light-content"
          translucent={false}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalSubTitle: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'left',
    fontWeight: '400',
  },
  modal: {
    height: 220,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  bodInputContainer: {
    marginBottom:20,
    marginTop:10,
    textAlign: 'center',

  },
});
