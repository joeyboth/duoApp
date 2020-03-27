import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  ScrollView,

} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export default class Index extends Component {
  static navigationOptions = {
    headerShown: false,
    headerMode: 'none',
    cardStyle: {backgroundColor: '#fff'},
  };

  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.offset = 0;
    this.state = {
      scrollOffset: new Animated.Value(0),
      titleWidth: 0,
    };
  }

  componentDidMount() {
    this.state.scrollOffset.addListener(({value}) => (this.offset = value));
  }

  onScroll = e => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  render() {
    const {scrollOffset} = this.state;
    const screenWidth = Dimensions.get('window').width;

    return (
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <Animated.View
          style={[
            styles.header,
            {
              paddingHorizontal: screenWidth * 0.05,
              width: screenWidth,
              height: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [80, 50],
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
          <Animated.Text
            onLayout={e => {
              if (this.offset === 0 && this.state.titleWidth === 0) {
                const titleWidth = e.nativeEvent.layout.width;
                this.setState({titleWidth});
              }
            }}
            style={{
              fontWeight: 'bold',
              fontSize: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [30, 25],
                extrapolate: 'clamp',
              }),
            }}>
            Title
          </Animated.Text>
        </Animated.View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}
          scrollEventThrottle={20}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },

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
