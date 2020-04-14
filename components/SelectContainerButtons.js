import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'

export default class SelectContainerButtons extends Component{
    
    render(){

        return(
          <View style={styles.selectContainer}>
              <TouchableOpacity
                style={[
                  styles.selectItem,
                 this.props.leftActive
                    ? styles.selectItemActive
                    : styles.selectItem,
                ]}
                onPress={this.props.leftFunction}>
                <View>
                  <Text
                    style={[
                     this.props.leftActive
                        ? styles.selectItemTextActive
                        : styles.selectItemText,
                    ]}>
                    {this.props.leftTitle}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.selectItem,
                  this.props.rightActive
                    ? styles.selectItemActive
                    : styles.selectItem,
                ]}
                onPress={this.props.rightFunction}>
                <View>
                  <Text
                    style={[
                      this.props.rightActive
                        ? styles.selectItemTextActive
                        : styles.selectItemText,
                    ]}>
                     {this.props.rightTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 20,
  },
  selectItem: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 10,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
  },
  selectItemActive: {
    color: '#fff',
    backgroundColor: '#000',
  },
  selectItemText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectItemTextActive: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});