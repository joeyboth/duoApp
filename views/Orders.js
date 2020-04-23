import React, {Component} from 'react';
import {StyleSheet, Animated, StatusBar, ScrollView,FlatList,View,Text,TouchableOpacity,Image,Dimensions,AsyncStorage} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Header from '../components/Header';
import SelectContainerButtons from '../components/SelectContainerButtons';
import Empty from '../components/Empty';
import LoadingOrdersFooter from '../components/LoadingOrdersFooter';
import axios from 'axios';
var screen = Dimensions.get('window');

export default class Orders extends Component {
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
      showActive: true,
      showNonActive: false,
      nonActiveOrders:[],
      activeOrders:[
        {id: 1,status:1, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
      ],
      pageNonActive: 1,
      pageActive:1
     
    };
  }

  getDetails = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const newToken = 'Bearer ' + JSON.parse(userToken);
    axios({
      method: 'get',
      url: 'https://api.retrii.com/api/waitrest/all',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: newToken,
      },
    })
      .then((response) => {
        console.log(response);
        this.setState({activeOrders: response.data});

      })
      .catch((error) => {
        // handle error
        console.log(error.response);
      
      });
  };

  getActiveOrders() {
    this.setState({
      showActive: true,
      showNonActive: false,
    });
  }

  getNonActiveOrders() {
    this.setState({
      showActive: false,
      showNonActive: true,
    });
  }

  componentDidMount() {
    this.state.scrollOffset.addListener(({value}) => (this.offset = value));
    this.getDetails()
  }

  onScroll = e => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  
  showPriceLabel(status, price) {
    if (status == 1) {
      return <Text style={styles.statusCreated}>{price}</Text>;
    } else if (status == 2) {
      return <Text style={styles.statusPaid}>{price}</Text>;
    } else if (status == 3) {
      return <Text style={styles.statusSent}>{price}</Text>;
    } else if (status == 4) {
      return <Text style={styles.statusCanceled}>{price}</Text>;
    } else {
      return <Text style={styles.statusElse}>{price}</Text>;
    }
  }

  showStatus(status) {
    if (status == 1) {
      return <Text style={{fontWeight: 'bold'}}>In afwachting</Text>;
    } else if (status == 2) {
      return <Text style={{fontWeight: 'bold'}}>Is betaald</Text>;
    } else if (status == 3) {
      return <Text style={{fontWeight: 'bold'}}>Is bezig</Text>;
    } else if (status == 4) {
      return <Text style={{fontWeight: 'bold'}}>Is geannuleerd</Text>;
    } else if (status == 5) {
      return <Text style={{fontWeight: 'bold'}}>Is voldaan</Text>;
    } else {
      return <Text style={{fontWeight: 'bold'}}>...</Text>;
    }
  }

  handleLoadMoreActiveOrders = () => {
    if (!this.state.lastFetchOrdersSold) {
      this.setState(
        {
          pageSoldOrders: this.state.pageSoldOrders + 1,
          loadingFooter: true,
        },
        () => {
          //this.fetchDataSoldOrders();
        },
      );
    }
  };

  handleLoadMoreNonActiveOrders = () => {
    if (!this.state.lastFetchOrdersOwn) {
      this.setState(
        {
          pageNonActive: this.state.pageNonActive + 1,
          loadingFooter: true,
        },
        () => {
          //this.fetchDataNonActiveOrders();
        },
      );
    }
  };


  createItems() {
    if (this.state.showActive) {
      if (this.state.activeOrders.length == 0) {
        return (
          <Empty
            title={'Geen reservering'}
            text={'Nog geen reservering plaatsgevonden.'}
          />
        );
      } else {
        return (
          <View>
            <FlatList
              data={this.state.activeOrders}
              keyExtractor={(x, i) => i}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Order',{
                      name: 'Cafétje',
                      persons: 4,
                      id: 1,
                      categories:[
                        {
                          id:1,
                          name: 'Hoofdmenu'
                        },
                        {
                          id:2,
                          name: 'Soepen'
                        },
                        {
                          id:3,
                          name: 'Visgerechten'
                        },
                        {
                          id:4,
                          name: 'Vleesgerechten'
                        },
                        {
                          id:5,
                          name: 'Snacks'
                        },
                        {
                          id:6,
                          name: 'Ijsjes'
                        },],
                        products:[
                          {
                            id:1,
                            category:1,
                            name: 'Vleesnogwat',
                            price: 15.29,
                            image: 'https://www.joorkitchen.nl/wp-content/uploads/2019/03/gevulde-paprika-BK-6-van-17.jpg'
                          },
                          {
                            id:2,
                            category:1,
                            name: 'Pizza',
                            price: 13.29,
                            image: 'https://www.joorkitchen.nl/wp-content/uploads/2019/03/gevulde-paprika-BK-6-van-17.jpg'
                          },
                          {
                            id:3,
                            category:1,
                            name: 'Friet',
                            price: 12.00,
                            image: 'https://www.joorkitchen.nl/wp-content/uploads/2019/03/gevulde-paprika-BK-6-van-17.jpg'
                          },
                          {
                            id:4,
                            category:2,
                            name: 'Tomatensoep',
                            price: 5.00,
                            image: 'https://www.joorkitchen.nl/wp-content/uploads/2019/03/gevulde-paprika-BK-6-van-17.jpg'
                          },
                          {
                            id:5,
                            category:2,
                            name: 'Groentensoep',
                            price: 5.00,
                            image: 'https://www.joorkitchen.nl/wp-content/uploads/2019/03/gevulde-paprika-BK-6-van-17.jpg'
                          },
                          {
                            id:6,
                            category:3,
                            name: 'Zwaardvis',
                            price: 25.99,
                            image: 'https://www.joorkitchen.nl/wp-content/uploads/2019/03/gevulde-paprika-BK-6-van-17.jpg'
                          },
                          {
                            id:7,
                            category:5,
                            name: 'Biefstuk',
                            price: 20.99,
                            image: 'https://www.joorkitchen.nl/wp-content/uploads/2019/03/gevulde-paprika-BK-6-van-17.jpg'
                          },
                          {
                            id:8,
                            category:5,
                            name: 'Varkenshaasje',
                            price: 20.99,
                            image: 'https://www.joorkitchen.nl/wp-content/uploads/2019/03/gevulde-paprika-BK-6-van-17.jpg'
                          },]

                    });
                  }}>
                  <Animated.View style={styles.containerNotification}>
                    <View
                      style={{
                        width: 40,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={styles.userProfile}
                        source={{uri: item.image}}
                      />
                    </View>
                    <View
                      style={{
                        width: screen.width - 100,
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <Text numberOfLines={1} style={styles.orderId}>
                        Het cafétje #{item.id}
                      </Text>
                      <Text numberOfLines={1} style={styles.messageRead}>
                        Status: {this.showStatus(item.status)}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              )}
              onEndReached={this.handleLoadMoreActiveOrders}
              onEndReachedThreshold={4}
              //ListFooterComponent={() => (
              //  <LoadingOrdersFooter loading={this.state.loadingFooter} />
              //)}
            />
          </View>
        );
      }
    } else if (this.state.showNonActive) {
      if (this.state.nonActiveOrders.length == 0) {
        return (
          <Empty
            title={'Geen bestelling'}
            text={'Nog geen bestelling plaatsgevonden.'}
          />
        );
      } else {
        return (
          <View>
            <FlatList
              data={this.state.nonActiveOrders}
              keyExtractor={(x, i) => i}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    AsyncStorage.setItem(
                      'userOrderSelectedId',
                      JSON.stringify(item.id),
                    );
                    this.props.navigation.navigate('Order');
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 999,
                    }}>
                    {this.showPriceLabel(item.status, item.order_price)}
                  </View>
                  <Animated.View style={styles.containerNotification}>
                    <View
                      style={{
                        width: 40,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={styles.userProfile}
                        source={{uri: item.image}}
                      />
                    </View>
                    <View
                      style={{
                        width: screen.width - 100,
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <Text numberOfLines={1} style={styles.orderId}>
                        #{item.id}
                      </Text>
                      <Text numberOfLines={1} style={styles.messageRead}>
                        Status: {this.showStatus(item.status)}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              )}
              onEndReached={this.handleLoadMoreNonActiveOrders}
              onEndReachedThreshold={1}
              // ListFooterComponent={() => (
              //   <LoadingOrdersFooter loading={this.state.loadingFooter} />
              // )}
            />
          </View>
        );
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <Header scrollOffset={this.state.scrollOffset} title={'Bestellingen'} />

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
          <SelectContainerButtons
              leftActive={this.state.showActive}
              leftTitle={'Aankomende'}
              leftFunction={() => {
                this.getActiveOrders();
              }}
              rightActive={this.state.showNonActive}
              rightTitle={'Afgelopen'}
              rightFunction={() => {
                this.getNonActiveOrders();
              }}
            />

{this.createItems()}
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  username: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 60,
    fontWeight: 'bold',
  },
  orderId: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 60,
    fontWeight: 'bold',
  },
  message: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  time: {
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  messageRead: {
    fontWeight: '400',
    marginLeft: 10,
    fontSize: 15,
  },
  notification: {
    position: 'absolute',
    borderRadius: 20,
    top: -5,
    left: -5,
    backgroundColor: 'red',
    borderColor: '#fff',
    borderWidth: 2,
    padding: 5,
  },
  containerNotification: {
    backgroundColor: '#ebebeb',
    paddingLeft: 10,
    width: '100%',
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  counter: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',

    textAlign: 'center',
    alignSelf: 'center',
  },
  counterActive: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000',

    textAlign: 'center',
    alignSelf: 'center',
  },
  counterItem: {
    width: 25,
    marginLeft: 5,
    marginTop: 1,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 90,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  counterItemActive: {
    width: 25,
    marginLeft: 5,
    marginTop: 1,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 90,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },

  notificationModalContainer: {
    borderRadius: 20,
    padding: 15,
    margin: 20,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  notificationModalTitle: {
    fontSize: 25,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  notificationModalSubTitle: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: '400',
  },
  notificationModalButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#000',
  },
  notificationModalButtonText: {
    flexDirection: 'row',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  statusPaid: {
    padding: 8,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#3fc380',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  statusCanceled: {
    padding: 8,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#f44336',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  statusSent: {
    padding: 8,
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: '#fdd835',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  statusCreated: {
    padding: 8,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: '#fdd835',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  statusElse: {
    padding: 8,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: '#bdbdbd',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
