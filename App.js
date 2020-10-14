import * as React from 'react'

import Brutrition from './src/Brutrition'
import Meal from './Objects/Meal'

import {createStore} from 'redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
 
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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Brutrition />
        </PersistGate>
      </Provider>
    );
  }
}
