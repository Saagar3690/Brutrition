import * as React from 'react'

import Brutrition from './src/Brutrition'

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
  loading: true
}

const reducer = (state = initialState, action) => {
  switch(action.type)
  {
    case 'FETCH_MENU':
      return {
        menus: action.payload,
        diningHalls: state.diningHalls,
        foods: state.foods,
        value: state.value,
        dataSource: state.dataSource,
        contentToDisplay: state.contentToDisplay,
        content: state.content,
        loading: state.loading
      }
    case 'FETCH_DINING_HALLS':

      return{
        diningHalls: action.payload,
        menus: state.menus,
        foods: state.foods,
        value: state.value,
        dataSource: state.dataSource,
        contentToDisplay: state.contentToDisplay,
        content: state.content,
        loading: state.loading
      }
    case 'FETCH_FOODS':
      return {
        foods: action.payload,
        menus: state.menus,
        diningHalls: state.diningHalls,
        value: state.value,
        dataSource: state.dataSource,
        contentToDisplay: state.contentToDisplay,
        content: state.content,
        loading: state.loading
      }
    case 'FETCH_FOOD_ITEM':
      fetch('https://brutrition.herokuapp.com/foods?id=KETCHUP')
      .then((response) => response.json())
      .then((responseJSON) => {
        return {
          dataSource: responseJSON.Data[0],
          contentToDisplay: true,
          menus: state.menus,
          diningHalls: state.diningHalls,
          foods: state.foods,
          value: state.value,
          content: state.content,
          loading: state.loading
        }
      })
      .catch((error) => {
        console.error(error)
      })
    case 'UPDATE_COUNT':
      return {
        value: action.payload,
        dataSource: state.dataSource,
        contentToDisplay: true,
        menus: state.menus,
        diningHalls: state.diningHalls,
        foods: state.foods,
        content: state.content,
        loading: state.loading
      }
    case 'LOADING_FINISHED':
      return {
        value: action.payload,
        dataSource: state.dataSource,
        contentToDisplay: true,
        menus: state.menus,
        diningHalls: state.diningHalls,
        foods: state.foods,
        content: state.content,
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
        {this.props.loading ? (<View><Text>Loading</Text></View>) : (<Brutrition />)}
      </Provider>
    );
  }
}
