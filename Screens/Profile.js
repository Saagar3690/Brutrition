import * as React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import CircleImage from '../Components/CircleImage'

import TopBar from '../Components/TopBar'

export default class Profile extends React.Component {
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
            <Text style={{margin: 0}}>10 Meals Tracked</Text>
            <Text style={{margin: 0}}>Last meal 4 hours ago</Text>
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
});
