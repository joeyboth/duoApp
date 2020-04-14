import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
  Text,
  View,
  Linking
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Header from '../components/Header';
import SettingsButton from '../components/SettingsButton';

export default class Settings extends Component {
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
    };
  }

  componentDidMount() {
    this.state.scrollOffset.addListener(({value}) => (this.offset = value));
    this.checkIfUserIsLoggedIn();
  }

  _onRefresh(){

  }

  async checkIfUserIsLoggedIn() {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {

      } else {
        this.props.navigation.navigate('Loading', {
          onGoBack: this._onRefresh,
        });
       
      }
    } catch (error) {
      this.props.navigation.navigate('Loading', {
        onGoBack: this._onRefresh,
      });
    }
  }

  onScroll = e => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <Header scrollOffset={this.state.scrollOffset} title={'Mijn account'} />
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
          <Text style={styles.containerTitle}>Persoonlijk</Text>
          <View style={styles.containerItems}>
            <SettingsButton
              title="Persoonlijke gegevens"
              icon="user"
              iconType="FontAwesome5"
              onPress={() => this.props.navigation.navigate('Profile')}
            />
           
          </View>
          <Text style={styles.containerTitle}>Overige</Text>
          <View style={styles.containerItems}>
            <SettingsButton
              title="Support"
              icon="headset"
              iconType="FontAwesome5"
              onPress={() => Linking.openURL('https://google.com/support')}
            />
             <SettingsButton
              title="Over Waitrest"
              icon="info"
              iconType="FontAwesome5"
              onPress={() => Linking.openURL('https://google.com')}
            />
            <SettingsButton
              title="Uitloggen"
              icon="unlink"
              iconType="FontAwesome5"
              onPress={() => alert('Uitgelogd.')}
            />
          </View>
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
  containerTitle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 22,
    marginBottom: 10,
  },
  containerItems: {
    marginBottom: 20,
    alignContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
});
