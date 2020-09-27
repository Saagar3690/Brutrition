import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet } from 'react-native'

import TopBar from '../Components/TopBar'

import {connect} from 'react-redux'

class DiningHalls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation
    }
  }

  async componentDidMount() {
    this.render()
  }

  render() {
    var items = []
    for(let i = 0; i < this.props.diningHalls.length; i++) {
      items.push(
        <TouchableWithoutFeedback key={i} onPress={() => this.state.navigation.navigate('Dining Hall Menu', {
          diningHallName: this.props.diningHalls[i],
          menu: this.props.menus[this.props.diningHalls[i]]
        })}>
          <View style={{flexDirection: 'column', paddingBottom: 40, justifyContent: 'center'}}>
            <Image source={require('../Images/Food.jpg')} style={{borderRadius: 40, borderWidth: 2, width: 75, height: 75}}/>
            <Text style={{paddingLeft: 12, paddingTop: 5, /*fontFamily: 'Times New Roman'*/}}>{this.props.diningHalls[i]}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <View>
        <TopBar/>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Add Meal</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>All Dining Halls</Text>
        </View>
        <View style={{paddingLeft: 30}}>
          { items }
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiningHalls)
