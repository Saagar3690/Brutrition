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
  content: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type)
  {
    case 'FETCH_MENU':
      fetch('https://brutrition.herokuapp.com')
      .then((response) => response.json())
      .then((responseJSON) => {
        return {
          menus: responseJSON.Data
        }
      })
    case 'FETCH_DINING_HALLS':
      var diningHallsLoc = []
      var menuSections = []
      for (var diningHall in state.menus) {
        diningHallsLoc.push(diningHall)
        var diningHallArray = state.menus[diningHall]
        for (var i = 0; i < diningHallArray.length; i++) {
          for (var menuSection in diningHallArray[i]) {
            if (!menuSections.includes(menuSection)) {
              menuSections.push(menuSection)
            }
          }
        }
      }

      return{
        diningHalls: diningHallsLoc
      }
    case 'FETCH_FOODS':
      fetch('https://brutrition.herokuapp.com/foods/all')
      .then((response) => response.json())
      .then((responseJSON) => {
        return {
          foods: Object.keys(responseJSON.Data).map((item) => {
            let tmpString = item.replace(new RegExp('_', 'g'), ' ').toLowerCase()
            let tmpString2 = tmpString.split(' ').map((word => {
              return word.charAt(0).toUpperCase() + word.slice(1)
            })).join(' ')

            return tmpString2
          })
        }
      })
    case 'FETCH_FOOD_ITEM':
      fetch('https://brutrition.herokuapp.com/foods?id=KETCHUP')
      .then((response) => response.json())
      .then((responseJSON) => {
        return {
          dataSource: responseJSON.Data[0],
          contentToDisplay: true
        }
      })
      .catch((error) => {
        console.error(error)
      })

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
