import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage
} from 'react-native';
import StarRating from 'react-native-star-rating';
var screen = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Feather';

class RestaurantsList extends React.Component {

  render() {
   
     
    return (
      <View>
       <TouchableOpacity  onPress={() => {
                            AsyncStorage.setItem(this.props.navigationId, JSON.stringify(this.props.id));
                            this.props.navigation.navigate(this.props.navigationName, { name: 'Detail', title: this.props.title, image: this.props.image });


                        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            left: 90,
            zIndex: 999,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
          }}>
             <Icon  style={styles.clock} name='clock' size={10} color='#000' />
          <Text numberOfLines={1} style={styles.time}>
            {this.props.time}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            right: 10,
            zIndex: 999,
          }}>
          <StarRating
            disabled={true}
            emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
            rating={this.props.rate}
            fullStarColor={'#000'}
            starSize={17}
           
          />
        </View>
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={{uri: this.props.image}} />
          </View>
          <View style={styles.containerInfo}>
            <Text numberOfLines={1} style={styles.title}>
              {this.props.title}
            </Text>
            <Text numberOfLines={1} style={styles.category}>
              {this.props.category}
            </Text>
          </View>
        </View>
        </TouchableOpacity></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    flexDirection: 'row',
  },
  containerImage: {
    width: 80,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 5,
  },

  containerInfo: {
    width: screen.width - 100,
    alignItems: 'flex-start',
    //flexDirection: 'column',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginLeft: 10,
    marginRight: 60,
    fontWeight: 'bold',
  },
  category: {
    fontWeight: '400',
    marginLeft: 10,
    fontSize: 15,
  },

  time: {
    fontWeight: '400',
    marginLeft: 3,
    fontSize: 12,
  },
  clock:{
    
    marginLeft: 10,
  }
});


export default RestaurantsList;
