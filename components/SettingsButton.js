import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import IconFont from 'react-native-vector-icons/FontAwesome5';
export default class SettingsButton extends Component{
    
    render(){

        return(
         <TouchableOpacity
         style={styles.containerItem}
         onPress={this.props.onPress}>
         <View
           style={{
             justifyContent: 'flex-start',
             alignItems: 'center',
             flexDirection: 'row',
           }}>
           <View style={styles.iconWidth}>
             {this.props.iconType == 'Feather' ? <Icon name={this.props.icon} solid size={20} color="#000" /> : <IconFont name={this.props.icon} solid size={20} color="#000" />}
           </View>
           <Text style={styles.itemText}>{this.props.title}</Text>
         </View>
       </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: '#ebebeb',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlignVertical: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 10,
    marginBottom: 5,
  },
  iconWidth: {
    padding: 8,
    width: 40,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 50,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});