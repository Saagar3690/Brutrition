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
  let mealSummaries = this.props.meals.slice(0, 4).map((meal, i) => <MealSummary key={i} data={meal} />)
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
      <NutritionLabel
        servingSize={'1 cup (228g)'}
        servingsPerContainer={2}
        calories={260}
        totalFat={13}
        saturatedFat={5}
        transFat={2}
        cholesterol={30}
        sodium={660}
        totalCarbs={31}
        dietaryFiber={0}
        sugars={5}
        protein={5}
        vitaminA={4}
        vitaminC={2}
        calcium={15}
        iron={4}
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
