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
            <Text style={{marginTop: 10}}>John Doe</Text>
            <Text style={{margin: 0}}>{this.props.meals.length} Meals Tracked</Text>
            {this.props.meals.length > 0 && <Text style={{margin: 0}}>Last meal {this.props.meals[this.props.meals.length - 1].timestamp.fromNow()}</Text>}
          </View>
          <Text style={styles.titleText}>My Goals</Text>
          <View style={{marginLeft: 40}}>
            <Text style={{marginTop: 15}}>Calories: 1700 cal</Text>
            <Text style={{marginTop: 15}}>Total Fat: 45g</Text>
            <Text style={{marginTop: 15, marginLeft: 20}}>Saturated Fat: 20g</Text>
            <Text style={{marginTop: 15}}>Cholesterol: 25mg</Text>
            <Text style={{marginTop: 15}}>Sodium: 100mg</Text>
            <Text style={{marginTop: 15}}>Carbohydrates: 150g</Text>
            <Text style={{marginTop: 15, marginLeft: 20}}>Dietary Fiber: 20g</Text>
            <Text style={{marginTop: 15, marginLeft: 20}}>Sugar: 40g</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile)