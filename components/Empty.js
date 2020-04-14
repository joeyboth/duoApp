import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Empty extends Component {
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: this.props.marginTop ? this.props.marginTop : 15,
          marginBottom: this.props.marginBottom ? this.props.marginBottom : 15,
        }}>
        {this.props.iconSize ? (
          <Icon
            name="frown"
            size={this.props.iconSize}
            color="#000"
            style={styles.oopsImage}
          />
        ) : (
          <Icon name="frown" size={60} color="#000" style={styles.oopsImage} />
        )}
        <Text style={styles.emptyTitle}>{this.props.title}</Text>
        <Text style={styles.emptyText}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  oopsImage: {
    marginBottom: 10,
  },
  emptyTitle: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 22,
    marginBottom:5,
  },
  emptyText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 17,
  },
});
