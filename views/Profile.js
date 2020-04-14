import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBack from '../components/HeaderBack';
import {InputText} from './../components/InputText';
import Button from './../components/Button';
import ModalAlert from './../components/ModalAlert';

export default class Profile extends Component {
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
      modal: false,
      name: '',
      email: ''
    };
  }

  _updateMasterState = (attrName, value) => {
    this.setState({[attrName]: value});
  };

  componentDidMount() {
    this.state.scrollOffset.addListener(({value}) => (this.offset = value));
  }

  onScroll = e => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  reservation() {
    this.setState({modal: true});
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#fff'}}>
          <HeaderBack
          scrollOffset={this.state.scrollOffset}
          title={'Mijn gegevens'}
          navigation={this.props.navigation}
        />

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

          
            <InputText
              attrName="name"
              title="Volledige naam"
              value={this.state.name}
              multi={false}
              autoFocus={true}
              autoFocus={true}
              height={50}
              error={this.state.nameError}
              updateMasterState={this._updateMasterState}
            />
            <InputText
              attrName="email"
              title="Emailadres"
              value={this.state.email}
              multi={false}
              autoFocus={true}
              autoFocus={true}
              height={50}
              error={this.state.emailError}
              updateMasterState={this._updateMasterState}
            />

            <Button
              onPress={() => this.reservation()}
              title={'Opslaan'}
              backgroundColor={'#000'}
              textColor={'#fff'}
            />
     
        </ScrollView>

        {this.state.name != '' && this.state.persons != '' ? <ModalAlert
          close={() => this.setState({modal: false})}
          modal={this.state.modal}
          title={'Yes!'}
          text={
            'Wij hebben jouw gegevens aangepast.' 
          }
        />: <ModalAlert
        close={() => this.setState({modal: false})}
        modal={this.state.modal}
        title={'Oops!'}
        text={
          'Je moet wel alle velden invullen.'
        }
      />}
        
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
  containerProfile: {
    position: 'relative',
    marginTop: 10,
  },
  coverImage: {
    position: 'relative',
    backgroundColor: '#eee',
    height: 150,
    borderRadius: 10,
    width: '100%',
  },
  avatarImage: {
    height: 130,
    width: 130,
    top: -70,
    left: 20,
    justifyContent: 'flex-start',
    borderRadius: 65,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#bdbdbd',
  },
  detailsContentRowProfile: {
    flex: 1,
    top: 9,
    right: 0,
    flexDirection: 'row',
    display: 'flex',
    marginLeft: 40,
    marginRight: 20,
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  detailsContentRowLeft: {
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 10,
  },
});
