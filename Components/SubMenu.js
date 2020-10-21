import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet } from 'react-native'

import FoodItem from './FoodItem'

export default class SubMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subMenuName: props.subMenuName,
      foods: props.foods,
    }
  }

  render() {
    var foodItems = []

    for (let i = 0; i < Object.keys(this.state.foods).length; i++) {
      let food = Object.keys(this.state.foods)[i]
      foodItems.push(
        <FoodItem
          foodName={food}
          portion={this.state.foods[food]['portion']}
          url={this.state.foods[food]['link']}
          key={i}
          index={i}
          quantityHandler={this.props.quantityHandler}
        />
      )
    }

    return (
      <View style={{flexDirection: 'column', paddingBottom: 40}}>
        <Text style={{flex: 1, fontSize: 20, paddingRight: 15, paddingTop: 6, paddingBottom: 10, /*fontFamily: 'Times New Roman'*/}}>{this.state.subMenuName}</Text>
        <View>
          { foodItems }
        </View>
      </View>
    )
  }
}
