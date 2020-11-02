import * as React from 'react'
import { Text, View, Image, ScrollView, StyleSheet, Button, Dimensions } from 'react-native'
import TopBar from '../Components/TopBar'
import Meal from '../Objects/Meal'
import {connect} from 'react-redux'
import * as Progress from 'react-native-progress'

import Colors from '../Constants/Colors'

class Diary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title
    }
  }

  getMealSummary(meal) {
    let calories = 0.0
    let carbs = 0.0
    let fats = 0.0
    let proteins = 0.0

    for (let i = 0; i < meal.foods.length; i++) {
      calories += (meal.foods[i].calories * meal.foods[i].quantity)
      carbs += (meal.foods[i].totalCarbohydrate.val.substring(0, meal.foods[i].totalCarbohydrate.val.length-1) * meal.foods[i].quantity)
      fats += (meal.foods[i].totalFat.val.substring(0, meal.foods[i].totalFat.val.length-1) * meal.foods[i].quantity)
      proteins += (meal.foods[i].protein.substring(0, meal.foods[i].protein.length-1) * meal.foods[i].quantity)
    }

    return (
      <View style={{flexDirection: 'row', marginRight: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: "red", paddingLeft: 5}}>{calories.toFixed(1)}cal</Text>
        <Text style={{color: "blue", paddingLeft: 5}}>{carbs.toFixed(1)}g</Text>
        <Text style={{color: "green", paddingLeft: 5}}>{fats.toFixed(1)}g</Text>
        <Text style={{color: "orange", paddingLeft: 5}}>{proteins.toFixed(1)}g</Text>
      </View>
    )
  }

  getDaySummary(diary, date) {
    let calories = 0.0
    let carbs = 0.0
    let fats = 0.0
    let proteins = 0.0

    for(let i = 0; i < diary[date].length; i++) {
      for (let j = 0; j < diary[date][i].foods.length; j++) {
        calories += (diary[date][i].foods[j].calories * diary[date][i].foods[j].quantity)
        carbs += (diary[date][i].foods[j].totalCarbohydrate.val.substring(0, diary[date][i].foods[j].totalCarbohydrate.val.length-1) * diary[date][i].foods[j].quantity)
        fats += (diary[date][i].foods[j].totalFat.val.substring(0, diary[date][i].foods[j].totalFat.val.length-1) * diary[date][i].foods[j].quantity)
        proteins += (diary[date][i].foods[j].protein.substring(0, diary[date][i].foods[j].protein.length-1) * diary[date][i].foods[j].quantity)
      }
    }

    let caloriesProgress = calories/this.props.user.goals.calories
    let carbsProgress = carbs/this.props.user.goals.totalCarbs
    let fatsProgress = fats/this.props.user.goals.totalFat
    let proteinProgress = proteins/this.props.user.goals.protein

    let goalStatement = "Let's work harder to beat your goals tomorrow!"
    let average = (caloriesProgress + caloriesProgress + fatsProgress + proteinProgress)/4
    if(average >= 1) goalStatement = "Yay! You reached your goals today!"
    else if(average >= 0.7 && average < 1) goalStatement = "So close! You almost reached your goals!"
    else if(average >= 0.5 && average < 0.7)  goalStatement = "Not bad! You reached half your goals!"

    return (
      <View style={{marginTop: 5, justifyContent: 'center', alignItems: 'center', marginRight: 20, marginLeft: 20, borderColor: Colors.primary, borderRadius: 5, borderWidth: 3, padding: 3}}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>{goalStatement}</Text>
        <View style={{flexDirection: 'row', paddingBottom: 10, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
            <View><Progress.Bar progress={caloriesProgress} width={Dimensions.get("window").width*0.3} color="red"/></View>
            <View><Text style={{paddingLeft: 10, fontWeight: 'bold'}}>{(caloriesProgress*100).toFixed(1)}%</Text></View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
            <View><Progress.Bar progress={carbsProgress} width={Dimensions.get("window").width*0.3} color="blue"/></View>
            <View><Text style={{paddingLeft: 10, fontWeight: 'bold'}}>{(carbsProgress*100).toFixed(1)}%</Text></View>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
            <View><Progress.Bar progress={fatsProgress} width={Dimensions.get("window").width*0.3} color="green"/></View>
            <View><Text style={{paddingLeft: 10, fontWeight: 'bold'}}>{(fatsProgress*100).toFixed(1)}%</Text></View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
            <View><Progress.Bar progress={proteinProgress} width={Dimensions.get("window").width*0.3} color="orange"/></View>
            <View><Text style={{paddingLeft: 10, fontWeight: 'bold'}}>{(proteinProgress*100).toFixed(1)}%</Text></View>
          </View>
        </View>
      </View>
    )
  }

  getDiaryItems() {
    let diary = {}

    for (let i = this.props.meals.length-1; i >= 0; i--) {
      if(this.props.meals[i].foods.length == 0) continue
      if(this.props.meals[i].timestamp.format("MMMM DD, YYYY") in diary)
        diary[this.props.meals[i].timestamp.format("MMMM DD, YYYY")].push(this.props.meals[i])
      else
        diary[this.props.meals[i].timestamp.format("MMMM DD, YYYY")] = [this.props.meals[i]]
    }

    //console.log(diary)
    let diaryItems = []

    for (const date in diary) {
      diaryItems.push(
        <View style={{marginTop: 50}}>
          <Text style={styles.subtitleText}>{date}</Text>
          {this.getDaySummary(diary, date)}
          {diary[date].map(meal => {
              return (
                <View style={{marginTop: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}><Text style={[styles.subtitleText2, {marginLeft: 20}]}>{meal.type} at {meal.diningHall}</Text></View>
                    {this.getMealSummary(meal)}
                  </View>
                  <View style={styles.containerH}>
                    <View style={{flex: 1}}>
                      <Text style={{marginLeft: 40, fontWeight: 'bold', fontSize: 16}}>Item</Text>
                      {Object.keys(meal.items).map(key => <Text key={key} style={{marginLeft: 40}}>{key}</Text>)}
                    </View>
                    <View style={{marginRight: 20}}>
                      <Text style={{marginLeft: 40, fontWeight: 'bold', fontSize: 16}}>Servings</Text>
                      {Object.keys(meal.items).map(key => <Text key={key} style={{marginLeft: 40, textAlign: 'center'}}>{meal.items[key]}</Text>)}
                    </View>
                  </View>
                </View>
              )
            }
          )}
        </View>
      )
    }

    return diaryItems
  }

  render() {
    this.getDiaryItems()
    return (
      <View>
        <TopBar/>
        <ScrollView contentContainerStyle={{paddingBottom: 200}}>
          <Text style={styles.titleText}>{this.state.title}</Text>
          {this.getDiaryItems()}
        </ScrollView>
      </View>
    )
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(Diary)

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    paddingTop: 10
  },
  subtitleText: {
    fontSize: 24,
    marginLeft: 20,
    fontWeight: 'bold'
  },
  subtitleText2: {
    fontSize: 20,
    marginLeft: 20,
  },
  containerH: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  containerV: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20
  }
});
