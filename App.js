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
  meals: []
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
    default:
      return state
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    let store = createStore(reducer) // default
    this.subscribe(store)
    this.state = { store }
    AsyncStorage.getItem('persistedState')
      .then(state => JSON.parse(state))
      .then(state => { 
        if(!state) return
        console.log('Retrieved', state)
        let store = createStore(reducer, state)
        this.subscribe(store)
        this.setState({ store })
      })
      .catch(error => console.error(error))
  }

  subscribe(store) {
    store.subscribe(() => {
      let state = JSON.stringify(store.getState())
      console.log('Subscribe', state)
      AsyncStorage.setItem('persistedState', state)
        .catch(error => console.error(error))
    })
  }

  render() {
    return (
      <Provider store={this.state.store}>
          <Brutrition />
      </Provider>
    )
  }
}
