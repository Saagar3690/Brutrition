import * as React from 'react'

import Brutrition from './src/Brutrition'
import Meal from './Objects/Meal'

import {createStore} from 'redux'
import {Provider} from 'react-redux'

const initialState = {
  menus: {},
  diningHalls: [],
  foods: [],
  value: 0,
  dataSource: [],
  contentToDisplay: false,
  content: '',
  loading: true,
  meals: [ new Meal() ]
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
  }
  return state
}

const store = createStore(reducer)


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Brutrition />
      </Provider>
    );
  }
}
