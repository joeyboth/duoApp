import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'

export default class Button extends Component{
    
    render(){

        return(
          <TouchableOpacity
          style={[styles.buttonContainer, {marginBottom: this.props.marginBottom ? this.props.marginBottom : 15,marginTop: this.props.marginTop ? this.props.marginTop : 15}]}
          onPress={this.props.onPress}>
          <View
            style={[
              styles.button,
              {
                backgroundColor: this.props.backgroundColor,
                flexDirection: 'row',
                justifyContent: 'center',
              },
            ]}>
            <Text style={[{color: this.props.textColor}, styles.buttonText]}>
             {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  buttonContainer: {
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
    paddingRight: 70,
    paddingLeft: 70,
    borderRadius: 15,
  },
  buttonText: {
    flexDirection: 'row',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});