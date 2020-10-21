import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet, Dimensions } from 'react-native'

export default class MealSummaryPiece extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      value: props.value,
      shorthand: props.shorthand,
      color: props.color
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Text style={[styles.iconText, {color: this.state.color}]}>{this.state.shorthand}</Text>
        </View>
        <Text style={styles.nameText}>{this.state.name}</Text>
        <Text>{this.state.value}g</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    backgroundColor: 'black',
    borderRadius: 25,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    width: 30,
    height: 30,
    fontSize: 27,
    fontWeight: '700',
    textAlign: 'center'
  },
  nameText: {
    fontWeight: 'bold',
    paddingTop: 5
  }
});
