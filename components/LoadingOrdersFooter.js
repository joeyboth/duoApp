import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
var screen = Dimensions.get('window');
export default class LoadingOrdersFooter extends Component {
  render() {
    if (!this.props.loading) return null;
    return (
      <View>
        <SkeletonPlaceholder
          backgroundColor={'#ebebeb'}
          highlightColor={'#f5f5f5'}>
          <View
            style={{
              backgroundColor: '#ebebeb',
              width: screen.width - 40,
              borderRadius: 10,
              height: 60,
              padding: 15,
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          />
        </SkeletonPlaceholder>
      </View>
    );
  }
}
