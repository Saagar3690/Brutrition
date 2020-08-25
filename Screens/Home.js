import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, TextInput } from 'react-native'
import Meal from '../Objects/Meal'
import MealSummary from '../Components/MealSummary'

import TopBar from '../Components/TopBar'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        meals: [ new Meal(), new Meal(), new Meal(), new Meal() ]
    }
  }

render() {
  return (
    <View>
      <TopBar/>
      <Text style={styles.titleText}>Nutrition Summary</Text>
      <Image source={require('../Images/graph.png')} style={{height: 200, width: 'auto', margin: 10}}></Image>
      <Text style={styles.titleText}>Meals</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {this.state.meals.map(meal => <MealSummary data={meal} />)}
      </View>
      <Text style={styles.titleText}>My Friends</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', margin: 10, padding: 10, backgroundColor: 'lightgray', color: 'gray', borderRadius: 6 }}
        onChangeText={text => onChangeText(text)}
        value={'Share with your friends...'}
        />
    </View>
  )
}
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    paddingTop: 10
  }
});