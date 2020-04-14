import React, {Component} from 'react'
import {StyleSheet, Dimensions, Animated} from 'react-native'

export default class Header extends Component{
    
    render(){
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
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 4,
              // },
              // shadowOpacity: 0.3,
              // shadowRadius: 4.65,

              // elevation: scrollOffset.interpolate({
              //   inputRange: [0, 200],
              //   outputRange: [0, 8],
              //   extrapolate: 'clamp',
              // }),
            },
          ]}>
          <Animated.Text
            style={{
              fontWeight: 'bold',
              marginBottom:3,
              fontSize: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [30, 25],
                extrapolate: 'clamp',
              }),
            }}>
            {this.props.title}
          </Animated.Text>
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