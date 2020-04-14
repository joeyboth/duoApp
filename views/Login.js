import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Animated,
  StatusBar,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import axios from 'axios';
import {InputText} from './../components/InputText';
import HeaderBack from './../components/HeaderBack';
import LoadingButton from './../components/LoadingButton';
import Button from './../components/Button';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
    headerMode: 'none',
    cardStyle: {backgroundColor: '#fff'},
  };

  constructor(props) {
    super(props);

    this.offset = 0;
    this.state = {
      scrollOffset: new Animated.Value(0),
      loadingButton: false,
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      invalidError: '',
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

  _updateMasterState = (attrName, value) => {
    if (attrName == 'email') {
      this.setState({[attrName]: value.replace(/\s/g, '')});
    } else {
      this.setState({[attrName]: value});
    }
  };

  getStatus() {
    if (this.state.loadingButton == false) {
      return (
        <Button
          onPress={() => this.loginUser()}
          title={'Inloggen'}
          backgroundColor={'#000'}
          textColor={'#fff'}
        />
      );
    } else {
      return (
        <LoadingButton
          title={'Controleren'}
          backgroundColor={'#000'}
          textColor={'#fff'}
        />
      );
    }
  }

  loginUser = () => {
    if (this.state.email == '' && this.state.password == '') {
      this.setState({
        loadingButton: false,
        emailError: 'Voer jouw e-mailadres in.',
        passwordError: 'Voer jouw wachtwoord in.',
      });
    } else if (this.state.password == '' || this.state.email == '') {
      if (this.state.password == '') {
        this.setState({
          loadingButton: false,
          emailError: '',
          passwordError: 'Voer jouw wachtwoord in.',
        });
      }
      if (this.state.email == '') {
        this.setState({
          loadingButton: false,
          emailError: 'Voer jouw e-mailadres in.',
          passwordError: '',
        });
      }
    }
      this.setState({
        loadingButton: true,
        emailError: '',
        passwordError: '',
        invalidError: '',
      });
      axios({
        method: 'post',
        url: 'https://api.retrii.com/api/user/login',
        data: {
          email: this.state.email,
          password: this.state.password,
        },
      })
        .then(response => {
          this.setState({
            loadingButton: false,
          });
          AsyncStorage.setItem(
            'userToken',
            JSON.stringify(response.data.access_token),
          );
          this.props.navigation.navigate('App');
        })
        .catch(error => {
          this.setState({
            loadingButton: false,
            invalidError: 'Ongeldige inloggegevens.',
          });
        });
   
  };

  render() {
    return (
      <SafeAreaView
        style={{paddingTop: getStatusBarHeight(), backgroundColor: '#fff'}}>
        <HeaderBack
          scrollOffset={this.state.scrollOffset}
          title={'Inloggen'}
          navigation={this.props.navigation}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}
          scrollEventThrottle={20}>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          <View style={styles.formContainer}>
            <InputText
              attrName="email"
              title="E-mailadres"
              // subTitle = 'Het is op dit moment niet mogelijk om jouw emailadres aan te kunnen passen.'
              value={this.state.email}
              height={50}
              autoFocus={true}
              multi={false}
              error={this.state.emailError}
              updateMasterState={this._updateMasterState}
            />

            <InputText
              attrName="password"
              title="Wachtwoord"
              value={this.state.password}
              multi={false}
              autoFocus={true}
              height={50}
              password={true}
              error={this.state.passwordError}
              updateMasterState={this._updateMasterState}
            />
            {this.state.invalidError ? (
              <Text style={styles.invalidError}>{this.state.invalidError}</Text>
            ) : null}
            {this.getStatus()}
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },

  formContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  containerGenderItem: {
    backgroundColor: '#ebebeb',
    width: 100,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ebebeb',
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
  },
  containerGenderItemSelected: {
    backgroundColor: '#ebebeb',
    width: 100,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
  },
  categoryGenderTitle: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  titleStyles: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
  },
  invalidError: {
    fontSize: 15,
    marginTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
});
