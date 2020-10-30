import * as React from 'react'

import Brutrition from './src/Brutrition'
import Meal from './Objects/Meal'

import { createStore } from 'redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'

const initialState = {
  menus: {},
  diningHalls: [],
  foods: [],
  value: 0,
  dataSource: [],
  contentToDisplay: false,
  content: '',
  loading: true,
  meals: [],
  user: {}
}

const reducer = (state = initialState, action) => {
  switch(action.type)
  {
    case 'FETCH_MENU':
      return {
        ...state,
        menus: action.payload,
      }
    case 'FETCH_DINING_HALLS':

      return {
        ...state,
        diningHalls: action.payload,
      }
    case 'FETCH_FOODS':
      return {
        ...state,
        foods: action.payload,
      }
    case 'FETCH_FOOD_ITEM':
      fetch('https://brutrition.herokuapp.com/foods?id=KETCHUP')
      .then((response) => response.json())
      .then((responseJSON) => {
        return {
          ...state,
          dataSource: responseJSON.Data[0],
          contentToDisplay: true,
        }
      })
      .catch((error) => {
        console.error(error)
      })
    case 'UPDATE_COUNT':
      return {
        ...state,
        value: action.payload,
      }
    case 'LOADING_FINISHED':
      return {
        ...state,
        loading: false
      }
    case 'ADD_MEAL':
      //console.log('Adding meal', state.meals, action.payload)
      let meals = state.meals.slice()
      meals.push(action.payload)
      return {
        ...state,
        meals
      }
    case 'SET_MEALS':
      return {
        ...state,
        meals: action.payload.slice()
      }
    case 'REGISTER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }

    default:
      return state
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducer) // default
    this.subscribe(this.store)
    // this.state = { store }
    AsyncStorage.getItem('storedMeals')
      .then(meals => JSON.parse(meals))
      .then(meals => meals && meals.map(meal => Meal.parse(meal)))
      .then(meals => {
        if(!meals) return
        //console.log('Retrieved', meals)
        this.store.dispatch({ type: 'SET_MEALS', payload: meals })
        // let state = Object.assign({ meals }, initialState)
        // let store = createStore(reducer, state)
        // this.subscribe(store)
        // this.setState({ store })
      })
      .catch(error => console.error(error))

    AsyncStorage.getItem('user')
      .then(user => JSON.parse(user))
      .then(user => {
        if(!user) return
        //console.log('Retrieved', user)
        this.store.dispatch({ type: 'SET_USER', payload: user})
      })
      .catch(error => console.error(error))
  }

  subscribe(store) {
    store.subscribe(() => {
      let meals = store.getState().meals
      meals = JSON.stringify(meals)
      AsyncStorage.setItem('storedMeals', meals)
        .catch(error => console.error(error))

      let user = store.getState().user
      user = JSON.stringify(user)
      AsyncStorage.setItem('user', user)
        .catch(error => console.error(error))
    })
  }

  render() {
    return (
      <Provider store={this.store}>
          <Brutrition />
      </Provider>
    )
  }
}
