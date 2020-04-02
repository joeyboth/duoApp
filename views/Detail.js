import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBack from '../components/HeaderBack';
import {InputTextNumeric} from './../components/InputTextNumeric';
import {InputText} from './../components/InputText';
import Button from './../components/Button';
import ModalAlert from './../components/ModalAlert';

export default class Detail extends Component {
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
      persons: ''
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
          title={'Details'}
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

          <View style={styles.containerProfile}>
            <Image
              style={styles.coverImage}
              source={{
                uri:
                  'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Image
                style={styles.avatarImage}
                source={{
                  uri:
                    'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg',
                }}
              />
              <View style={styles.detailsContentRowProfile}>
                <View style={styles.detailsContentRowLeft}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 22,
                      color: '#000',
                      textAlign: 'center',
                    }}>
                    Het cafétje
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{top: -50}}>
            <Text style={styles.title}>Reserveren</Text>
            <InputText
              attrName="name"
              title="Uw naam"
              value={this.state.name}
              multi={false}
              autoFocus={true}
              autoFocus={true}
              height={50}
              error={this.state.nameError}
              updateMasterState={this._updateMasterState}
            />
            <InputTextNumeric
              attrName="persons"
              title="Aantal personen"
              value={this.state.persons}
              multi={false}
              autoFocus={true}
              autoFocus={true}
              height={50}
              error={this.state.personsError}
              updateMasterState={this._updateMasterState}
            />

            <Button
              onPress={() => this.reservation()}
              title={'Reserveren'}
              backgroundColor={'#000'}
              textColor={'#fff'}
            />
          </View>
        </ScrollView>

        {this.state.name != '' && this.state.persons != '' ? <ModalAlert
          close={() => this.setState({modal: false})}
          modal={this.state.modal}
          title={'Yes!'}
          text={
            'Wij hebben jouw reservering ontvangen op de naam ' + this.state.name + ' met ' + this.state.persons + ' personen.' 
          }
        />: <ModalAlert
        close={() => this.setState({modal: false})}
        modal={this.state.modal}
        title={'Oops!'}
        text={
          'Je moet wel alle velden invullen om een reservering te kunnen plaatsen.'
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
