/* =========================================================================
Expo App: VirtualMe
Description: Used to help study a user's personality
Creators: David, Marc, Paul
Starting date: 06/07/2020 
Note to self: use shift+alt+A => code into line fast
========================================================================= */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, Input } from 'react-native';

import { ActivityIndicator } from 'react-native'; // used for loading images

//react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons'; //icons on bottom tab

// -----------------------------------------------------------------------

//Creating constants used for navigation
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator(); 
const SettingsStack = createStackNavigator();


//functions: The 4 main pages are created here
const QuizzesScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Quizz 1</Text>
      <Text>Quizz 2</Text>
    </View>
  );
}

const SearchScreen = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Looking for something?</Text>
    </View>
  );
}

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>This page is all about YOU </Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate("Settings")} />
    </View>
  );
}

const ShopScreen = (props) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Want to upgrade? Get unlimited tools for only $X.XX </Text>
    </View>
    );

//This page is a page inside a main page
const SettingsScreen = (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text> • Log Out </Text>
    <Text> • Change password </Text>
    <Text> • Help </Text>
    <Text> • About </Text>
  </View>
  );

//Creating the settings stack navigator
const SettingsStackNavigator =({navigation, route})=> {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true
    });
  }
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name= "Profile" component= {ProfileScreen} />
      <SettingsStack.Screen name= "Settings" component= {SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

//Tab navigator function
const HomeTabNavigator = () =>(
<Tabs.Navigator screenOptions={({route}) => ({
  tabBarIcon:({color,size}) => {
    let iconName // Used so that the icon of a page changes when on that page
    if(route.name == 'Home')
    {
      iconName = 'ios-home'
    }
    else if(route.name == 'Search')
    {
      iconName = 'ios-search'
    }
    else if(route.name == 'Profile')
    {
      iconName = 'ios-contact'
    }
    else if(route.name == 'Shop')
    {
      iconName = 'ios-cart'
    }
    return <Ionicons name={iconName} size={size} color={color} />
  }
})}>

  <Tabs.Screen name = "Home" component={QuizzesScreen}/>
  <Tabs.Screen name = "Search" component={SearchScreen}/>
  <Tabs.Screen name = "Profile" component={SettingsStackNavigator}/>
  <Tabs.Screen name = "Shop" component={ShopScreen}/>
  
</Tabs.Navigator>

)

//The function below is used to change de header of each page
function getHeaderTitle(route) {
  const routeName = route.state ? route.state.routes[route.state.index].name :'Quizzes' //change Quizzes to the first page name

  switch(routeName){
    case 'Home':
      return (
        <span>[logo]</span>
        // <View>
        //    <Image
        //     source= {require('./images/logo1_VirtualMe.png')}
        //     style={{ width: 100, height: 25}}
        //     PlaceholderContent={<ActivityIndicator />} //to keep or not to keep?
        //   />
        // </View>
      );
    case 'Search':
      return 'Search';
    case 'Profile':
      return 'MyProfile';
    case 'Shop':
      return 'MyShop';
  }
}

//Getting rid of double headers
 function shouldHeaderBeShown(route) {
  const routeName = route.state ? route.state.routes[route.state.index].name:'MyProfile';
  switch (routeName) {
    case "Profile":
      return false;
  }
}

export default function App() {
  console.log('Loading console...');
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS
        }}
        headerMode="float"
        >
        <Stack.Screen 
        options={({route})=>({
          title: getHeaderTitle(route),
          headerShown:shouldHeaderBeShown(route) 

        })}
        name="Quizzes" 
        component={HomeTabNavigator} 
        />
        
        <Stack.Screen 
        options={{title: 'MyProfile'}}
        name="Profile" 
        component={ProfileScreen} 
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
