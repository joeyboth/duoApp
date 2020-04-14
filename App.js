import * as React from 'react';
import {
  Text,
  AsyncStorage,
  YellowBox,
  StatusBar,
  StyleSheet,
  View,
  Linking,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
console.disableYellowBox = true;



//screens
import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Index';
import Search from './views/Search';
import Settings from './views/Settings';
import Profile from './views/Profile';
import Detail from './views/Detail';
import Orders from './views/Orders';

class AuthLoadingScreen extends React.Component {

  componentDidMount() {
    
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    this.props.navigation.navigate('Home');
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = event => {
    this.navigate(event.url);
  };

  navigate = url => {
    const {navigate} = this.props.navigation;

    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];
    if (routeName === 'order') {
      AsyncStorage.setItem('userOrderSelectedId', JSON.stringify(id));
      navigate('Order');
    }
  };

  render() {
    YellowBox.ignoreWarnings([
      'VirtualizedLists should never be nested', // TODO: Remove when fixed
      'Remote debugger is in a background tab which may cause apps to perform slowly',
      'Require cycle: node_modules/rn-fetch-blob/index.js',
      'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
    ]);
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false}
          />

          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontFamily: 'Iowan Old Style',
              fontWeight: 'bold',
            }}>
            All. Restaurants.
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 50,
              fontFamily: 'Iowan Old Style',
              fontWeight: 'bold',
            }}>
            Waitrest.
          </Text>
        </View>
      );
    }
  }

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
        gestureEnabled: true,
        gestureDirection: "horizontal"
      }}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="HomeDetail" component={Detail} />
    </Stack.Navigator>
  );
}


function SearchStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
        gestureEnabled: true,
        gestureDirection: "horizontal"
      }}>
      <Stack.Screen name="Search" component={Search}/>
      <Stack.Screen name="SearchDetail" component={Detail} />
    </Stack.Navigator>
  );
}

function OrdersStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
        gestureEnabled: true,
        gestureDirection: "horizontal"
      }}>
      <Stack.Screen name="Orders" component={Orders} />
    
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
        gestureEnabled: true,
        gestureDirection: "horizontal"
      }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}




function HomeTabs() {
  return (
    <Tab.Navigator headerMode="none" tabBarOptions= {{
      showLabel: false,
      style: {height:60}
    }}>
            <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarVisible: ( route  ) => 
          route.name  == 'Loading' ?  (false) :  (alert('state'))
          ,
          tabBarIcon: ({ focused }) => 
            focused ? (
              <Image
                source={require('./assets/menu/home-solid.png')}
                style={{width: 30, height: 30}}
              />
            ) : (
              <Image
                source={require('./assets/menu/home-regular.png')}
                style={{width: 30, height: 30}}
              />
            ),
        }}
      />
      
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ 
          tabBarIcon: ({ focused }) => 
            focused ? (
              <Image
                source={require('./assets/menu/search-solid.png')}
                style={{width: 30, height: 30}}
              />
            ) : (
              <Image
                source={require('./assets/menu/search-regular.png')}
                style={{width: 30, height: 30}}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStack}
        options={{ 
          tabBarIcon: ({ focused }) => 
            focused ? (
              <Image
                source={require('./assets/menu/search-solid.png')}
                style={{width: 30, height: 30}}
              />
            ) : (
              <Image
                source={require('./assets/menu/search-regular.png')}
                style={{width: 30, height: 30}}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => 
            focused ? (
              <Image
                source={require('./assets/menu/user-solid.png')}
                style={{width: 30, height: 30}}
              />
            ) : (
              <Image
                source={require('./assets/menu/user-regular.png')}
                style={{width: 30, height: 30}}
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
    <Stack.Navigator  headerMode="none"
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
      }} >
        <Stack.Screen name="Welcome" component={AuthLoadingScreen} />
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Loading" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
