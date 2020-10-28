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

  handleAdd = () => this.handleChangeValue(this.state.value + 1)
  handleSubtract = () => this.handleChangeValue(Math.max(0, this.state.value - 1))
  handleChangeValue = value => {
    this.setState({ value })
    this.props.quantityHandler(this.props.index, value)
  }

  render() {
    return (
      <View style={{flexDirection: 'row', paddingBottom: 40, paddingLeft: 10}}>
        <Image source={require('../Images/Food.jpg')} style={{borderRadius: 20, borderWidth: 2, width: 30, height: 30}}/>
        <View style={{flex: 1, paddingLeft: 10, paddingRight: 15}}>
          <Text style={{fontSize: 14 /*fontFamily: 'Times New Roman'*/}}>{this.cleanUpFoodName(this.state.foodName)}</Text>
          <Text style={{fontSize: 10}}>Serving Size: {this.state.portion}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Button title='-' onPress={this.handleSubtract} style={styles.button}/>
          <Text style={{ borderColor: 'gray', borderWidth: 2, padding: 6, textAlign: 'center' }} >{this.state.value}</Text>
          <Button title='+' onPress={this.handleAdd} style={styles.button}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100
  }
})
