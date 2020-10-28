import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, TextInput } from 'react-native'
import Meal from '../Objects/Meal'
import MealSummary from '../Components/MealSummary'
import { connect } from 'react-redux'
import NutritionLabel from '../Components/NutritionLabel'

import TopBar from '../Components/TopBar'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

render() {
  let start = this.props.meals.length - 3
  if (start < 0)
    start = 0
  let mealSummaries = this.props.meals.slice(start).reverse().map((meal, i) => <MealSummary key={i} data={meal} />)
  //console.log(mealSummaries)
  return (
    <View>
      <TopBar/>
      <Text style={styles.titleText}>Nutrition Summary</Text>
      <Image source={require('../Images/graph.png')} style={{height: 200, width: 'auto', margin: 10}}></Image>
      <Text style={styles.titleText}>Meals</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {mealSummaries.length > 0 ? mealSummaries : <Text>You don't have any recent meals</Text>}
      </View>
      {/* <Text style={styles.titleText}>My Friends</Text> */}
      {/*
      <TextInput
        style={{ height: 40, borderColor: 'gray', margin: 10, padding: 10, backgroundColor: 'lightgray', color: 'gray', borderRadius: 6 }}
        onChangeText={text => onChangeText(text)}
        value={'Share with your friends...'}
        />
      */}
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
})

function mapStateToProps(state) {
  return {
    meals: state.meals
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
