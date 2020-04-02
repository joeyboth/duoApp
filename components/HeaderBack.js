import React, {Component} from 'react'
import {StyleSheet, Dimensions, Animated, View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
export default class HeaderBack extends Component{
    
    render( navigation ){
        const scrollOffset = this.props.scrollOffset;
        const screenWidth = Dimensions.get('window').width;
        return(
          <Animated.View
          style={[
            styles.header,
            {
              paddingHorizontal: screenWidth * 0.05,
              width: screenWidth,
              height: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [80, 60],
                extrapolate: 'clamp',
              }),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,

              elevation: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [0, 8],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <View
            style={{
              justifyContent: 'flex-start',
              textAlignVertical: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <Animated.View
              style={{
                marginTop: scrollOffset.interpolate({
                  inputRange: [0, 200],
                  outputRange: [2, 0],
                  extrapolate: 'clamp',
                }),
              }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'flex-start',
                  textAlignVertical: 'center',
                  marginRight: 10,
                  padding: 3,
                  backgroundColor: '#ebebeb',
                  borderRadius: 50,
                }}
                onPress={() => 
                  this.props.navigation.goBack()
                }>
                <Icon name="chevron-left" size={32} color="#000" />
              </TouchableOpacity>
            </Animated.View>
            <Animated.Text
              onLayout={e => {
                if (this.offset === 0 && this.state.titleWidth === 0) {
                  const titleWidth = e.nativeEvent.layout.width;
                  this.setState({titleWidth});
                }
              }}
              style={{
                fontWeight: 'bold',
                justifyContent: 'flex-start',
                textAlignVertical: 'center',
                fontSize: scrollOffset.interpolate({
                  inputRange: [0, 200],
                  outputRange: [30, 25],
                  extrapolate: 'clamp',
                }),
              }}>
              {this.props.title}
            </Animated.Text>
          </View>
          {/* <Animated.View
          style={{
            width: scrollOffset.interpolate({
              inputRange: [0, 200],
              outputRange: [screenWidth * 0.9 - this.state.titleWidth, 0],
              extrapolate: 'clamp',
            }),
          }}
        /> */}
        </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 35,
        marginTop: 30,
        fontWeight: 'bold',
        paddingBottom: 20,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
      },
});