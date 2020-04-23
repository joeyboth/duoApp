import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
var screen = Dimensions.get("window");
import Icon from "react-native-vector-icons/Feather";
import SafeAreaView from "react-native-safe-area-view";
import Button from './../components/Button';
import HeaderBack from "../components/HeaderBack";
export default class Order extends Component {
  static navigationOptions = {
    headerShown: false,
    headerMode: "none",
    cardStyle: { backgroundColor: "#fff" },
  };

  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.offset = 0;
    this.state = {
      scrollOffset: new Animated.Value(0),
      selectedCategory:1,
      selectedItems: [],
      total: 0.00
    };
  }

  _updateMasterState = (attrName, value) => {
    this.setState({ [attrName]: value });
  };

  componentDidMount() {
    this.state.scrollOffset.addListener(({ value }) => (this.offset = value));
  }

  onScroll = (e) => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  setStyle(id){
    if(this.state.selectedCategory == id){
      return{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#000",
        borderRadius: 10,
        color:'#fff',
        marginTop: 5,
        marginBottom: 5,
      }
    }
    else{
      return{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        color:'#000',
        marginTop: 5,
        marginBottom: 5,}
    }
  }

  AddItem(id, price, name){
    var newTotal = this.state.total + price;
    this.setState({
        selectedItems: [...this.state.selectedItems,{'id':id,'price':price,'name':name}],
        total: Number((newTotal).toFixed(2))
    });
    console.log(this.state.selectedItems)
  }

  render() {
    const { route } = this.props;
    const { navigation } = this.props;
    const { id } = route.params;
    const { name } = route.params;
    const { categories } = route.params;
    const { persons } = route.params;
    const { products } = route.params;

    const rowLen = categories.length;
    const moreitems = categories.map((item, key) => (
      <TouchableOpacity
        key={key}
        style={{ marginLeft: key === 0 ? 20 : 10 , marginRight: rowLen - 1 === key ? 20 : 0 }}
        onPress={()=> this.setState({selectedCategory: item.id})}
      >
        <Text numberOfLines={1} style={this.setStyle(item.id)}>
          {item.name}
        </Text>
      </TouchableOpacity>
    ));

    const moreproducts = products.map((item, key) => (
      item.category == this.state.selectedCategory ? 
      <TouchableOpacity
        key={key}
        onPress={() => this.AddItem(item.id, item.price, item.name)}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            right: 10,
            zIndex: 999,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
          }}>
             
          <Text numberOfLines={1} style={styles.count}>
           Aantal: {this.state.selectedItems.filter(itemSub => itemSub.id === item.id).length}x
          </Text>
        </View>

        <View style={styles.productContainer}>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={{uri: item.image}} />
          </View>
          <View style={styles.containerInfo}>
            <Text numberOfLines={1} style={styles.title}>
              {item.name}
            </Text>
            <Text numberOfLines={1} style={styles.category}>
              €{item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity> : null
    ));

    return (
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <HeaderBack
          scrollOffset={this.state.scrollOffset}
          title={name}
          navigation={this.props.navigation}
        />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}
          scrollEventThrottle={20}
        >
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false}
          />
          <View style={{marginBottom:20,}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {moreitems}
              </ScrollView>
          </View>
          
          <View style={{marginLeft:20, marginRight:20,marginBottom:20}}>

                {moreproducts}

          </View>

          <View style={styles.containerInvoice}>
            <Text style={styles.titleSub}>Overzicht</Text>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>Bestelling:</Text>
              <Text style={styles.detailsText}>
                <Text style={styles.bold}>#{id}</Text>
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>Tafel:</Text>
              <Text style={styles.detailsText}>
                <Text style={styles.bold}>32</Text>
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>Aantal personen:</Text>
              <Text style={styles.detailsText}>
                <Text style={styles.bold}>{persons}</Text>
              </Text>
            </View>
            <View style={styles.detailsContainerLast}>
              <Text style={styles.detailsText}>Totaal:</Text>
              <Text style={styles.detailsText}>
    <Text style={styles.bold}>€{this.state.total}</Text>
              </Text>
            </View>

            <Button
              onPress={() => alert('Bestelling geplaatst')}
              title={'Bestelling plaatsen'}
              backgroundColor={'#000'}
              textColor={'#fff'}
            />
          </View>

        
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  titleSub: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5,
  },
  total: {
    fontSize: 20,
  },
  container: {

    paddingBottom: 20,
    paddingTop: 10,
    height: "100%",
    backgroundColor: "#fff",
  },

  containerInvoice: {
    position: "relative",
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerInvoiceTop: {
    position: "relative",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    //marginTop:5,
  },
  detailsContainerLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    marginBottom: 10,
    // paddingBottom:5,
    // borderBottomWidth:1 ,
    // borderBottomColor: '#e0e0e0'
    //marginTop:5,
  },
  detailsText: {
    fontSize: 19,
  },
  subContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  addressText: {
    fontSize: 17,
  },
  containerTitle: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
  moreFromImage: {
    height: 100,
    width: 100,
    backgroundColor:'#eee',
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  moreFromTitleX: {
    marginTop: 7,
    maxWidth: 140,
    marginBottom: 4,
    fontSize: 17,
    fontWeight: "bold",
  },
  moreFromText: {
    fontSize: 14,
    marginTop:-4,
    fontWeight: "500",
  },
  productContainer: {
    backgroundColor: '#ebebeb',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    flexDirection: 'row',
  },
  containerImage: {
    width: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 5,
  },

  containerInfo: {
    width: screen.width - 100,
    alignItems: 'flex-start',
    //flexDirection: 'column',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 60,
    fontWeight: 'bold',
  },
  category: {
    fontWeight: '400',
    marginLeft: 10,
    fontSize: 15,
  },

  count: {
    fontWeight: '400',
    marginLeft: 3,
    fontSize: 17,
  },

});
