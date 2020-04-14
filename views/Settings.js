import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  NativeModules,
  Linking
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import RNFetchBlob from 'rn-fetch-blob';
import SettingsButton from '../components/SettingsButton';
import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
import SelectCameraOptions from '../components/SelectCameraOptions';


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
      avatarSource: null,
      profileImage: [],
      avatarSource2: null,
      coverImage: [],
      modalCover: false,
      modalProfile: false
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

  pickCoverImage(cropping, mediaType='photo') {
    ImagePicker.openPicker({
      cropping: cropping,
      width: 1000,
      height: 600,
      includeExif: true,
      mediaType,
      includeBase64: true,
    })
      .then((image) => {
        console.log('received image', image);
        let source = image.path;
        this.setState({
          avatarSource2: source,
          coverImage: {
            data: image.data,
            uri: image.path,
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          modalCover: false,
          modalProfile: false
        });
        //this.uploadCover();
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  pickProfileImage(cropping, mediaType='photo') {
    ImagePicker.openPicker({
      cropping: cropping,
      width: 1000,
      height: 1000,
      includeExif: true,
      mediaType,
      includeBase64: true,
    })
      .then((image) => {
        console.log('received image', image);
        let source = image.path;
        this.setState({
          avatarSource: source,
          profileImage: {
            data: image.data,
            uri: image.path,
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          modalCover: false,
            modalProfile: false
        });
        console.log(this.state);
        //this.uploadProfile();
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  openCameraProfile(cropping, mediaType='photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 1000,
      height: 1000,
      includeExif: true,
      mediaType,
      includeBase64: true,
    }).then(image => {
      console.log('received image', image);
        let source = image.path;
        this.setState({
          avatarSource: source,
          profileImage: {
            data: image.data,
            uri: image.path,
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          modalCover: false,
            modalProfile: false
        });
        console.log(this.state);
    }).catch(e => console.log(e));
  }

  openCameraCover(cropping, mediaType='photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 1000,
      height: 600,
      includeExif: true,
      mediaType,
      includeBase64: true,
    }).then(image => {
      console.log('received image', image);
        let source = image.path;
        this.setState({
          avatarSource2: source,
          coverImage: {
            data: image.data,
            uri: image.path,
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          modalCover: false,
            modalProfile: false
        });
        console.log(this.state);
    }).catch(e => console.log(e));
  }

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
          <View style={styles.containerProfile}>
            <Image
              style={styles.coverImage}
              source={{uri: this.state.avatarSource2}}
            />
            <TouchableOpacity
              style={styles.changeProfileBackground}
              onPress={() => this.setState({modalCover: true})}>
              <Icon name="camera" size={18} color="#212121" />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={styles.changeProfile}
                onPress={() => this.setState({modalProfile: true})}>
                <Icon name={'camera'} solid size={18} color="#212121" />
              </TouchableOpacity>
              <Image
                style={styles.avatarImage}
                source={{uri: this.state.avatarSource}}
              />
              
            </View>
          </View>
          <View style={{top:-40}}>
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
          </View>
        </ScrollView>
        <SelectCameraOptions
        modal={this.state.modalProfile}
        title={'Camera opties'}
        close={() => this.setState({modalProfile: false})}
        firstButtonFunction={() => this.openCameraProfile(true)}
        secondButtonFunction={() => this.pickProfileImage(true)}
        firstButtonName={'Camera'}
        secondButtonName={'Fotobibliotheek'}
      />
      <SelectCameraOptions
        modal={this.state.modalCover}
        title={'Camera opties'}
        close={() => this.setState({modalCover: false})}
        firstButtonFunction={() => this.openCameraCover(true)}
        secondButtonFunction={() => this.pickCoverImage(true)}
        firstButtonName={'Camera'}
        secondButtonName={'Fotobibliotheek'}
      />
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
  containerProfile: {
    position: 'relative',
  },
  coverImage: {
    position: 'relative',
    backgroundColor: '#ebebeb',
    height: 150,
    borderRadius: 10,
    width: '100%',
  },
  changeProfileBackground: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: '#ebebeb',
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 10,
    zIndex: 9,
  },
  changeProfile: {
    position: 'absolute',
    top: 22,
    borderColor: '#fff',
    borderWidth: 1.5,
    left: 110,
    backgroundColor: '#ebebeb',
    padding: 10,
    borderRadius: 50,
    zIndex: 9,
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
});
