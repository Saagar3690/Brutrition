import * as React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import AddMeal from '../Screens/AddMeal'
import Diary from '../Screens/Diary'
import Settings from '../Screens/Settings'

import Colors from '../Constants/Colors'

import {connect} from 'react-redux'


const Tab = createBottomTabNavigator()

class Brutrition extends React.Component {
  async componentDidMount () {
    await this.props.fetchMenu()
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'ios-home';
              } else if (route.name === 'Profile') {
                iconName = 'ios-person';
              } else if (route.name === 'Add Meal') {
                iconName = 'ios-add-circle';
              } else if (route.name === 'Diary') {
                iconName = 'ios-book';
              } else if (route.name === 'Settings') {
                iconName = 'ios-settings';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: Colors.primary,
            inactiveTintColor: Colors.secondary,
          }}
        >
          <Tab.Screen name="Home" children={() => <Home title='Home'/>} />
          <Tab.Screen name="Profile" children={() => <Profile title='Profile'/>} />
          <Tab.Screen name="Add Meal" children={() => <AddMeal title='Add Meal'/>} />
          <Tab.Screen name="Diary" children={() => <Diary title='Diary'/>} />
          <Tab.Screen name="Settings" children={() => <Settings title='Settings'/>} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    menus: state.menus,
    diningHalls: state.diningHalls,
    foods: state.foods
  }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchMenu: () => dispatch({ type: 'FETCH_MENU'}),
      fetchDiningHalls: () => dispatch({ type: 'FETCH_DINING_HALLS'}),
      fetchFoods: () => dispatch({ type: 'FETCH_FOODS'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brutrition)
