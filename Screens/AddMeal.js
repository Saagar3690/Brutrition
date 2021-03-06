import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import TopBar from '../Components/TopBar'
import Nutrition from '../Components/Nutrition'

import DiningHalls from './DiningHalls'
import DiningHallMenu from './DiningHallMenu'
import NutritionInfo from './NutritionInfo'

import {connect} from 'react-redux'

const AddMealStack = createStackNavigator()

class AddMeal extends React.Component {
  componentDidMount = () => {
    this.render()
  }

  render() {
    return (
      <AddMealStack.Navigator screenOptions={{headerShown: false}}>
        <AddMealStack.Screen name='Dining Halls' component={DiningHalls} />
        <AddMealStack.Screen name='Dining Hall Menu' component={DiningHallMenu} />
        <AddMealStack.Screen name='Nutrition Info' component={NutritionInfo} />
      </AddMealStack.Navigator>
    )
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
    fetchFoodItem: () => dispatch({ type: 'FETCH_FOOD_ITEM'}),
    updateCount: (value) => dispatch({ type: 'UPDATE_COUNT', payload: value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMeal)
