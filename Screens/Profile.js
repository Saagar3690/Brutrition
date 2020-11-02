import * as React from 'react'
import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import CircleImage from '../Components/CircleImage'
import { connect } from 'react-redux'
import moment from 'moment'
import { ProgressChart, ContributionGraph } from 'react-native-chart-kit'
import { DataTable } from 'react-native-paper'

import TopBar from '../Components/TopBar'
import Colors from '../Constants/Colors'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      caloriesProgress: 0.0,
      carbsProgress: 0.0,
      fatsProgress: 0.0,
      proteinsProgress: 0.0,
    }
  }

  componentDidMount() {
    this.getProgress()
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
    if(calories > this.props.user.goals.calories)  calories = this.props.user.goals.calories
    if(carbs > this.props.user.goals.totalCarbs)  carbs = this.props.user.goals.totalCarbs
    if(fats > this.props.user.goals.totalFat)  fats = this.props.user.goals.totalFat
    if(proteins > this.props.user.goals.protein)  proteins = this.props.user.goals.protein

    this.setState({
      caloriesProgress: calories/this.props.user.goals.calories,
      carbsProgress: carbs/this.props.user.goals.totalCarbs,
      fatsProgress: fats/this.props.user.goals.totalFat,
      proteinsProgress: proteins/this.props.user.goals.protein,
    })
  }

  getDataTable() {
    let goals = ["Calories", "Total Fat", "Sodium", "Carbohydrates", "Dietary Fiber", "Sugar", "Protein"]
    let values = Object.values(this.props.user.goals)
    let units = ["cal",  "g", , "mg", "g", "g", "g", "g"]
    let dataTableItems = []
    for (let i = 0; i < goals.length; i++) {
      dataTableItems.push(
        <DataTable.Row key={i}>
          <DataTable.Cell>{goals[i]}</DataTable.Cell>
          <DataTable.Cell numeric>{values[i]}{units[i]}</DataTable.Cell>
        </DataTable.Row>
      )
    }

    return dataTableItems
  }

  getContributionDataGraph() {
    let data = []
    let timestamp = moment().format("YYYY-MM-DD")
    let count = 0

    for (let i = 0; i < this.props.meals.length; i++) {
      if(this.props.meals[i].timestamp.format("YYYY-MM-DD") === timestamp)
        count++
      else {
        data.push({
          date: timestamp,
          count: count
        })
        timestamp = this.props.meals[i].timestamp.format("YYYY-MM-DD")
        count = 1
      }
    }

    return data
  }

  render() {
    return (
      <View>
        <TopBar/>
        <ScrollView contentContainerStyle={{paddingBottom: 150}}>
          <Text style={styles.titleText}>{this.state.title}</Text>
          <View style={styles.containerV}>
            <CircleImage size={120} path={'../Images/icecream.png'} />
            <Text style={{marginTop: 10}}>{this.props.user.name}</Text>
            <Text style={{margin: 0}}>{this.props.meals.length} Meals Tracked</Text>
            {this.props.meals.length > 0 && <Text style={{margin: 0}}>Last meal {this.props.meals[this.props.meals.length - 1].timestamp.fromNow()}</Text>}
          </View>
          <Text style={styles.titleText}>Daily Progress</Text>
          <View style={{marginLeft: -20, marginRight: 20}}>
            <ProgressChart
              data={{
                labels: ["Calories", "Carbs", "Fats", "Proteins"], // optional
                data: [this.state.caloriesProgress, this.state.carbsProgress, this.state.fatsProgress, this.state.proteinsProgress]
              }}
              width={Dimensions.get("window").width}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: Colors.primary,
                backgroundGradientToOpacity: 0,
                color: (opacity = Math.random()) => `rgba(122, 145, 225, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.3,
                useShadowColorFromDataset: false // optional,
              }}
              hideLegend={false}
            />
          </View>
          <Text style={styles.titleText}>My Goals</Text>
          <DataTable style={{borderRadius: 10, borderColor: 'black'}}>
              <DataTable.Header>
                <DataTable.Title>Category</DataTable.Title>
                <DataTable.Title numeric>Value</DataTable.Title>
              </DataTable.Header>
              {this.getDataTable()}
            </DataTable>
            <Text style={styles.titleText}>History</Text>
            <ContributionGraph
              values={this.getContributionDataGraph()}
              endDate={moment().format("YYYY-MM-DD")}
              numDays={110}
              width={Dimensions.get("window").width*0.9}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: Colors.primary,
                backgroundGradientToOpacity: 0,
                color: (opacity = 1) => `rgba(122, 145, 225, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.3,
                useShadowColorFromDataset: false // optional
              }}
            />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    paddingTop: 10
  },
  containerV: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20
  },
  goals: {
    paddingBottom: 10,
    fontSize: 16
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
