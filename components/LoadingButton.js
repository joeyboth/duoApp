import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View, Text,ActivityIndicator} from 'react-native'

export default class LoadingButton extends Component{
    
    render(){

        return(
          <TouchableOpacity style={styles.buttonContainer}>
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
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <ActivityIndicator size="small" color="#fff" />
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
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
    marginTop:15,
    marginBottom:15,
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
    marginLeft: 10,
    textAlign: 'center',
  },
});