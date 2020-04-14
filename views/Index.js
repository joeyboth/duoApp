import React, {Component} from 'react';
import {StyleSheet, Animated, StatusBar, ScrollView,FlatList} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Header from './../components/Header';
import RestaurantsList from './../components/RestaurantsList';

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
      restaurants: [
        {id: 1,title:'Het cafétje', category:'Sushi',time:'17:00',rate:2.5, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
        {id: 1,title:'Turkse tent', category:'Turkse grill',time:'14:30',rate:4.5, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
        {id: 1,title:'Het damfish', category:'Sushi',time:'14:00',rate:5, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
        {id: 1,title:'Turkse tent', category:'Turkse grill',time:'16:00',rate:4.5, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
        {id: 1,title:'Turks', category:'Turkse grill',time:'14:00',rate:4, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
        {id: 1,title:'Dammeke', category:'Friettent',time:'16:00',rate:4.5, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
        {id: 1,title:'Het cafétje', category:'Sushi',time:'14:00',rate:4.5, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
        {id: 1,title:'Best fish etc.', category:'Sushi',time:'16:30',rate:4, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
        {id: 1,title:'Het Sushi restaurant', category:'Sushi',time:'11:00',rate:4, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
        {id: 1,title:'Café de vis', category:'Sushi',time:'16:00',rate:4, image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg'},
      ]
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
    return (
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <Header scrollOffset={this.state.scrollOffset} title={'Waitrest'} />

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

          <FlatList
            data={this.state.restaurants}
            style={{marginBottom:80}}
            keyExtractor={(x, i) => i}
            renderItem={({item}) => (
              <RestaurantsList
                id={item.id}
                image={item.image}
                title={item.title}
                category={item.category}
                time={item.time}
                rate={item.rate}
                navigationName={'HomeDetail'}
                navigationId={'selectedRestaurantId'}
                navigation={this.props.navigation}
              />
            )}
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
});
