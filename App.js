import * as React from 'react';
import { Text, AsyncStorage, YellowBox, StatusBar, StyleSheet, View, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import AppIntroSlider from 'react-native-app-intro-slider';
console.disableYellowBox = true;

import Landing from './views/Index';
import Login from './views/Index';
import Register from './views/Index';
import Home from './views/Index';
import Search from './views/Search';
import Orders from './views/Index';
import Settings from './views/Index';

class AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show_Main_App: true
    };
  }

async getSlider() {
    const slider = await AsyncStorage.getItem("slider");

    if(JSON.parse(slider)){
      this.setState({
        show_Main_App: true
      })
      this.props.navigation.navigate('App');
    }
    else{
      this.setState({
        show_Main_App: false
      })
      
    }
  
}



on_Done_all_slides = () => {


    this.setState({ show_Main_App: true });
    AsyncStorage.setItem('slider', JSON.stringify(true));
    this.getSlider();
  };
 
  on_Skip_slides = () => {
    this.setState({ show_Main_App: true });
    AsyncStorage.setItem('slider', JSON.stringify(true));
    this.getSlider();
  };

  

 componentDidMount() {
   this.getSlider();
}

handleOpenURL = (event) => {
  this.navigate(event.url);
}


  render() {
    YellowBox.ignoreWarnings([ 
      'VirtualizedLists should never be nested', // TODO: Remove when fixed
      'Remote debugger is in a background tab which may cause apps to perform slowly',
      'Require cycle: node_modules/rn-fetch-blob/index.js',
      'Require cycle: node_modules/react-native/Libraries/Network/fetch.js'
    ]);
    if (this.state.show_Main_App == false){return (
      <AppIntroSlider
          slides={slides}
          onDone={this.on_Done_all_slides}
          showSkipButton={true}
          onSkip={this.on_Skip_slides}
        />
      
    );}
    else{
      return (
        <View style={{
          flex: 1, 
          alignItems: 'center',
          justifyContent: 'center'
      }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" translucent={false}/>
        
          <Text style={{color: '#000',
          fontSize: 18,
          fontFamily: 'Iowan Old Style',
          fontWeight: 'bold'}}>All. Restaurants.
          </Text>
          <Text style={{color: '#000',
          fontSize: 50,
          fontFamily: 'Iowan Old Style',
          fontWeight: 'bold'}}>Waitrest.
          </Text>
          {/* <ActivityIndicator  size="large" color="#000"/> */}
      </View>
      );
    }}
  
}

const styles = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  title1: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text1: {
    color: '#000',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }
});

const slides = [
  {
    key: 'k1',
    title: 'Welcome to Waitrest',
    text: 'Your online restaurant platform',
    image: {
      uri:
        '',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#212121',
  },
  {
    key: 'k2',
    title: 'Reserve a table',
    text: 'Reserve a table in your desired restaurant.',
    image: {
      uri:
      '',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#1565c0',
  },
  {
    key: 'k3',
    title: 'Order through Waitrest',
    text: 'Order the entire menu via Waitrest.',
    image: {
      uri: '',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#4caf50',
  }
];



const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{
      cardStyle: { backgroundColor: '#fff' }
    }}>

      <Stack.Screen name="Home" component={Home} />

    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{
      cardStyle: { backgroundColor: '#fff' }
    }}>
      <Stack.Screen name="Explore" component={Search} />
    </Stack.Navigator>
  );
}


function OrderStack() {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{
      cardStyle: { backgroundColor: '#fff' }
    }}>
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{
      cardStyle: { backgroundColor: '#fff' }
    }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
function AuthStack() {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{
      cardStyle: { backgroundColor: '#fff' }
    }}>
      <Stack.Screen name="Main" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}


function bottomNav() {
  return (

          <Tab.Navigator
            initialRouteName="Home"
            labeled={false}
            activeColor="#000"
            inactiveColor="#000000"
            barStyle={{ backgroundColor: '#fff', paddingBottom: 3 }}
          >
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (color == '#000' ?
                  <Image
                    source={require('./assets/menu/home-solid.png')}
                    style={{ width: 30, height: 30,  }}
                  />
                  :
                  <Image
                    source={require('./assets/menu/home-regular.png')}
                    style={{ width: 30, height: 30, }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Search"
              component={SearchStack}
              options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (color == '#000' ?
                  <Image
                    source={require('./assets/menu/search-solid.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  :
                  <Image
                    source={require('./assets/menu/search-regular.png')}
                    style={{ width: 30, height: 30 }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Orders"
              component={OrderStack}
              options={{
                tabBarLabel: 'Orders',
                tabBarIcon: ({ color, size }) => (color == '#000' ?
                <Image
                  source={require('./assets/menu/search-solid.png')}
                  style={{ width: 30, height: 30 }}
                />
                :
                <Image
                  source={require('./assets/menu/search-regular.png')}
                  style={{ width: 30, height: 30 }}
                />
              ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStack}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (color == '#000' ?
                  <Image
                    source={require('./assets/menu/user-solid.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  :
                  <Image
                    source={require('./assets/menu/user-regular.png')}
                    style={{ width: 30, height: 30 }}
                  />
                ),
              }}
            />

          </Tab.Navigator>
  );
}




export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SplashScreen" component={AuthLoadingScreen} />
      <Stack.Screen name="Loading" component={AuthStack} />
      <Stack.Screen name="App" component={bottomNav} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}


