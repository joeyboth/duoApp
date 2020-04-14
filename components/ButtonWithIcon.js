import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import IconFont from 'react-native-vector-icons/FontAwesome5';

export default class ButtonWithIcon extends Component{
    
    render(){

        return(
          <TouchableOpacity style={styles.buttonContainer}
          onPress={this.props.onPress}>
            <View style={{position: 'absolute', top: 0, left: 15, right: 0, bottom: 0, justifyContent: 'center',width:30, alignItems:'center', textAlignVertical: 'center',zIndex:9999}}>
            {this.props.iconType == 'Feather' ? <Icon name={this.props.icon} solid size={20} color={this.props.textColor} /> : <IconFont name={this.props.icon} solid size={20} color={this.props.textColor} />}
            </View>
          <View
            style={[
              styles.button,
              {
                backgroundColor: this.props.backgroundColor,
                flexDirection: 'row',
                justifyContent: 'center',

              },
            ]}>
 
            <View
              style={{
                justifyContent: 'center',
                textAlign:'center'
              }}>
              <Text style={[{color: this.props.textColor}, styles.buttonText]}>
              {this.props.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

       
        );
    }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop:20,
    marginBottom:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  button: {
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    flexDirection: 'row',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center',
  },
});