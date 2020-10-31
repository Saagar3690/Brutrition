import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, TextInput, Dimensions, ScrollView } from 'react-native'
import Meal from '../Objects/Meal'
import MealSummary from '../Components/MealSummary'
import { connect } from 'react-redux'
import NutritionLabel from '../Components/NutritionLabel'
import { LineChart } from 'react-native-chart-kit'
import * as Progress from 'react-native-progress'

import moment from 'moment'

import Colors from '../Constants/Colors'

import TopBar from '../Components/TopBar'
import DailyProgress from '../Components/DailyProgress'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      caloriesProgress: 0.0,
      carbsProgress: 0.0,
      fatsProgress: 0.0,
      proteinsProgress: 0.0,
      dailyCalories: 0.0,
      dailyCarbs: 0.0,
      dailyFats: 0.0,
      dailyProteins: 0.0

    }
  }

  componentDidMount() {
    this.getProgress()
  }

  getData() {
    let dataPointsCalories = []
    let dataPointsCarbs = []
    let dataPointsFats = []
    let dataPointsProteins = []
    let labels = []
    for (let i = 0; i < this.props.meals.length; i++) {
      let timestamp = this.props.meals[i].timestamp.format("MM/DD")
      let curDataCalories = this.props.meals[i].calories
      let curDataCarbs = this.props.meals[i].carbs
      let curDataFats = this.props.meals[i].fat
      let curDataProteins = this.props.meals[i].protein
      let j = i+1;
      while(j < this.props.meals.length) {
        if(!this.props.meals[j].timestamp.format("MM/DD") === timestamp)
          break
        curDataCalories += this.props.meals[j].calories
        curDataCarbs += this.props.meals[j].carbs
        curDataFats += this.props.meals[j].fat
        curDataProteins += this.props.meals[j].protein
        j++
      }
      labels.push(timestamp)
      dataPointsCalories.push(curDataCalories)
      dataPointsCarbs.push(curDataCarbs)
      dataPointsFats.push(curDataFats)
      dataPointsProteins.push(curDataProteins)
      i = j-1

    }
    //console.log(this.props.meals.map(meal => meal.timestamp.format("MM DD YYYY")))

    let data = {
      labels: labels.slice(labels.length-10),
      datasets: [
        {
          data: dataPointsCalories.slice(labels.length-10),
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
          strokeWidth: 2
        },
        {
          data: dataPointsCarbs.slice(labels.length-10),
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
          strokeWidth: 2
        },
        {
          data: dataPointsFats.slice(labels.length-10),
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // optional
          strokeWidth: 2
        },
        {
          data: dataPointsProteins.slice(labels.length-10),
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // optional
          strokeWidth: 2
        }
      ],
      legend: ["Calories", "Carbs", "Fats", "Proteins"]
    }

    return data
  }

  getProgress() {
    let calories = 0.0
    let carbs = 0.0
    let fats = 0.0
    let proteins = 0.0

    for (let i = 0; i < this.props.meals.length; i++) {
      if(this.props.meals[i].timestamp.format("MM/DD") == moment().format("MM/DD")) {
        calories += this.props.meals[i].calories
        carbs += this.props.meals[i].carbs
        fats += this.props.meals[i].fat
        proteins += this.props.meals[i].protein
      }
    }

    this.setState({
      caloriesProgress: calories/this.props.user.goals.calories,
      carbsProgress: carbs/this.props.user.goals.totalCarbs,
      fatsProgress: fats/this.props.user.goals.totalFat,
      proteinsProgress: proteins/this.props.user.goals.protein,
      dailyCalories: calories,
      dailyCarbs: carbs,
      dailyFats: fats,
      dailyProteins: proteins
    })
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
        <ScrollView contentContainerStyle={{paddingBottom: 150}}>
          <Text style={styles.titleText}>Nutrition Summary</Text>

          <LineChart
            data={this.getData()}
            width={Dimensions.get("window").width*0.95} // from react-native
            height={220}
            yAxisInterval={10} // optional, defaults to 1
            chartConfig={{
              backgroundColor: Colors.primary,
              backgroundGradientFrom: Colors.primary,
              backgroundGradientTo: Colors.primary,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
          <Text style={styles.titleText}>Today's Progress</Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <DailyProgress name={'Calories'} progress={this.state.caloriesProgress} dailyVal={this.state.dailyCalories} goal={this.props.user.goals.calories} color={'red'}/>
            <DailyProgress name={'Carbs'} progress={this.state.carbsProgress} dailyVal={this.state.dailyCarbs} goal={this.props.user.goals.totalCarbs} color={'blue'}/>
            <DailyProgress name={'Fats'} progress={this.state.fatsProgress} dailyVal={this.state.dailyFats} goal={this.props.user.goals.totalFat} color={'green'}/>
            <DailyProgress name={'Protein'} progress={this.state.proteinsProgress} dailyVal={this.state.dailyProteins} goal={this.props.user.goals.protein} color={'orange'}/>
          </View>
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
        </ScrollView>
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
    meals: state.meals,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
