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

export default class DailyProgress extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{paddingBottom: 10, width: '100%', paddingLeft: 20, paddingRight: 20}}>
        <Text style={{fontWeight: 'bold', color: this.props.color}}>{this.props.name}: </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}><Progress.Bar progress={this.props.progress} width={Dimensions.get("window").width*0.7} color={this.props.color}/></View>
          <View style={{flex: 4}}><Text style={{fontWeight: 'bold', paddingLeft: 10, color: this.props.color, textAlign: 'right'}}>{this.props.dailyVal}/{this.props.goal}</Text></View>
        </View>
      </View>
    )
  }
}
