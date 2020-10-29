import * as React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import CircleImage from '../Components/CircleImage'
import { connect } from 'react-redux'
import moment from 'moment'

import TopBar from '../Components/TopBar'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title
    }
  }

  render() {
    return (
      <View>
        <TopBar/>
        <View>
          <Text style={styles.titleText}>{this.state.title}</Text>
          <View style={styles.containerV}>
            <CircleImage size={120} path={'../Images/icecream.png'} />
            <Text style={{marginTop: 10}}>{this.props.user.name}</Text>
            <Text style={{margin: 0}}>{this.props.meals.length} Meals Tracked</Text>
            {this.props.meals.length > 0 && <Text style={{margin: 0}}>Last meal {this.props.meals[this.props.meals.length - 1].timestamp.fromNow()}</Text>}
          </View>
          <Text style={styles.titleText}>My Goals</Text>
          <View style={{marginLeft: 20}}>
            <Text style={styles.goals}>Calories: {this.props.user.goals.calories} cal</Text>
            <Text style={styles.goals}>Fat Calories: {this.props.user.goals.fatCalories}g</Text>
            <Text style={styles.goals}>Total Fat: {this.props.user.goals.totalFat}g</Text>
            <Text style={styles.goals}>Saturated Fat: {this.props.user.goals.saturatedFat}g</Text>
            <Text style={styles.goals}>Trans Fat: {this.props.user.goals.transFat}g</Text>
            <Text style={styles.goals}>Cholesterol: {this.props.user.goals.cholesterol}mg</Text>
            <Text style={styles.goals}>Sodium: {this.props.user.goals.sodium}mg</Text>
            <Text style={styles.goals}>Carbohydrates: {this.props.user.goals.totalCarbs}g</Text>
            <Text style={styles.goals}>Dietary Fiber: {this.props.user.goals.fiber}g</Text>
            <Text style={styles.goals}>Sugar: {this.props.user.goals.sugar}g</Text>
            <Text style={styles.goals}>Protein: {this.props.user.goals.protein}g</Text>
          </View>
        </View>
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
