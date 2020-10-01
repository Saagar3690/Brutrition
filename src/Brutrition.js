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
import LoadingScreen from '../Screens/LoadingScreen'

import Colors from '../Constants/Colors'

import {connect} from 'react-redux'


const Tab = createBottomTabNavigator()

class Brutrition extends React.Component {
  async componentDidMount () {
    await fetch('https://brutrition.herokuapp.com')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.props.fetchMenu(responseJSON.Data)
      //console.log(responseJSON.Data)
    })

    var diningHallsLoc = []
    var menuSections = []
    for (var diningHall in this.props.menus) {
      diningHallsLoc.push(diningHall)
      var diningHallArray = this.props.menus[diningHall]
      for (var i = 0; i < diningHallArray.length; i++) {
        for (var menuSection in diningHallArray[i]) {
          if (!menuSections.includes(menuSection)) {
            menuSections.push(menuSection)
          }
        }
      }
    }

    this.props.fetchDiningHalls(diningHallsLoc)

    await fetch('https://brutrition.herokuapp.com/foods/all')
    .then((response) => response.json())
    .then((responseJSON) => {
      var foods = Object.keys(responseJSON.Data).map((item) => {
        let tmpString = item.replace(new RegExp('_', 'g'), ' ').toLowerCase()
        let tmpString2 = tmpString.split(' ').map((word => {
          return word.charAt(0).toUpperCase() + word.slice(1)
        })).join(' ')

        return tmpString2
      })
      this.props.fetchFoods(foods)
    })

    this.props.doneLoading()
    this.render()
  }

  render() {
    if (this.props.loading) {
      return (<LoadingScreen/>)
    }
    else {
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
}

function mapStateToProps(state) {
  return {
    menus: state.menus,
    diningHalls: state.diningHalls,
    foods: state.foods,
    value: state.value,
    dataSource: state.dataSource,
    contentToDisplay: state.contentToDisplay,
    content: state.content,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchMenu: (menu) => dispatch({ type: 'FETCH_MENU', payload: menu }),
      fetchDiningHalls: (diningHalls) => dispatch({ type: 'FETCH_DINING_HALLS', payload: diningHalls}),
      fetchFoods: (foods) => dispatch({ type: 'FETCH_FOODS', payload: foods}),
      doneLoading: () => dispatch({ type: 'LOADING_FINISHED'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brutrition)
