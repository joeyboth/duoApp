import React, {Component} from 'react';
import {View, Animated, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {string, func} from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class SearchInput extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
  };

  constructor(props) {
    super(props);
    const {value} = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      showHelp: false,
    };
  }

  _onChangeText = updatedValue => {
    const {attrName, updateMasterState} = this.props;
    updateMasterState(attrName, updatedValue);
  };

  render() {
    if (!this.state.value == '') {
      this.setState({isFieldActive: true});
    }
    return (
      <View>
        

        <View style={[Styles.container, {height: this.props.height}]}>
          <TextInput
            value={this.props.value}
            editable={this.props.disabled}
            selectTextOnFocus={this.props.disabled}
            style={Styles.textInput}
            multiline={this.props.multi}
            numberOfLines={this.props.multicount}
            underlineColorAndroid="transparent"
            onFocus={this._handleFocus}
            maxLength={this.props.length}
            onBlur={this._handleBlur}
            onChangeText={this._onChangeText}
            placeholder={this.props.title}
          />
          <Text style={Styles.error}>{this.props.error}</Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  error: {
    fontSize: 10,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'red',
  },
  titleStyles: {
    fontWeight: 'bold',

    fontSize: 18,
  },
  subTitleStyles: {
    fontWeight: '400',
    fontSize: 13,
  },
  titlesContainer: {
    marginBottom: 5,
  },
});
