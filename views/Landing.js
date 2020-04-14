import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import ButtonWithIcon from './../components/ButtonWithIcon';
const {width, height} = Dimensions.get('window');
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default class Register extends Component {
  static navigationOptions = {
    headerShown: false,

  };

  goBackToScreen(){
    const {navigation, route} = this.props;
    navigation.goBack();
    route.params?.onGoBack();
 
   
  }
  render() {
    console.log(this.props.route)
    return (
      <View style={styles.container}>
        <Video
          //source={{uri: 'https://joeyboth.nl/video1.mp4'}}
          source={require('./../assets/intro.mp4')}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />

        <StatusBar
          barStyle="white-content"
          translucent
          backgroundColor="transparent"
        />

        <View
          style={{
            right: 10,
            top: getStatusBarHeight() + 10,
            position: 'absolute',
            padding: 8,
            zIndex: 9999,
            borderRadius: 50,
            backgroundColor: '#ebebeb',
            alignSelf: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => this.goBackToScreen()}>
            <Icon name={'x'} solid size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            top: getStatusBarHeight() + 70,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.logoText}>W.</Text>
          <Text style={styles.logoSubText}>All. Restaurants.</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{width: width - 40}}>
            <ButtonWithIcon
              onPress={() => this.props.navigation.navigate('Register')}
              title={'Doorgaan met Facebook'}
              icon={'facebook-f'}
              backgroundColor={'#3b5998'}
              textColor={'#fff'}
              iconColor={'#fff'}
              //   iconBackgroundColor={'#fff'}
            />
          </View>
          <View style={{width: width - 40, marginTop: -20}}>
            <ButtonWithIcon
              onPress={() => this.props.navigation.navigate('Register')}
              title={'Registreer met e-mail'}
              icon={'envelope'}
              backgroundColor={'#fff'}
              iconColor={'#000'}
              textColor={'#000'}
              //   iconBackgroundColor={'#000'}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 17,
                textAlign: 'center',
                color: '#fff',
                marginTop: 10,
              }}>
              Heb je al een account?{' '}
              <Text style={{fontWeight: 'bold'}}>Login</Text>
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: width,
              height: 1,
              backgroundColor: '#fff',
              marginTop: 30,
              marginBottom: 10,
            }}
          />
          <Text style={{fontSize: 12, textAlign: 'center', color: '#fff'}}>
            Door verder te gaan bevestig je dat je 16 jaar of ouder bent en
            akkoord gaat met de{' '}
            <Text style={{fontWeight: 'bold'}}>voorwaarden</Text>.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0.8,
  },
  logoSubText: {
    fontWeight: 'bold',
    fontSize: 27,
    color: '#fff',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 37,
    color: '#000',
    padding: 5,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
});
