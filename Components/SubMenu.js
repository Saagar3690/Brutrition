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

    for (food in this.state.foods) {
      foodItems.push(
        <FoodItem
        foodName={food}
        portion={this.state.foods[food]['portion']}
        url={this.state.foods[food]['link']}
        />
      )
    }

    return (
      <View style={{flexDirection: 'column', paddingBottom: 40}}>
          <Text style={{flex: 1, fontSize: 20, paddingRight: 15, paddingTop: 6, paddingBottom: 10, /*fontFamily: 'Times New Roman'*/}}>{this.state.subMenuName}</Text>
          <View>
            {foodItems}
          </View>
        </View>
    )
  }
}
