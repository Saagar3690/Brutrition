import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet } from 'react-native'

export default class FoodItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foodName: props.foodName,
      portion: props.portion,
      value: 0,
      url: props.url,
    }
  }

  cleanUpFoodName = (item) => {
    let tmpString = item.replace(new RegExp('_', 'g'), ' ').toLowerCase()
    let tmpString2 = tmpString.split(' ').map((word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })).join(' ')

    return tmpString2
  }

  render() {
    return (
      <View style={{flexDirection: 'row', paddingBottom: 40, paddingLeft: 10}}>
        <Image source={require('../Images/Food.jpg')} style={{borderRadius: 20, borderWidth: 2, width: 30, height: 30}}/>
        <View style={{flex: 1, paddingLeft: 10, paddingRight: 15}}>
          <Text style={{fontSize: 14 /*fontFamily: 'Times New Roman'*/}}>{this.cleanUpFoodName(this.state.foodName)}</Text>
          <Text style={{fontSize: 10}}>Serving Size: {this.state.portion}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', borderWidth: 2, width: 50, height: 25, borderColor: 'gray', borderRadius: 3, justifyContent: 'center'}}>
          <TextInput defaultValue='0' value={this.state.value.toString()} onChangeText={text => this.setState({value: text})} keyboardType='numeric' placeholder='0'></TextInput>
        </View>
      </View>
    )
  }
}
