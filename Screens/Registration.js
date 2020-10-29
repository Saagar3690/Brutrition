import * as React from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Constants from 'expo-constants';


import TopBar from '../Components/TopBar'

import Colors from '../Constants/Colors'

import {connect} from 'react-redux'
import { Keyboard } from 'react-native'

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      /*name: '',
      age: 0.0,
      height: 0.0,
      weight: 0.0,
      calories: 0.0,
      fatCalories: 0.0,
      totalFat: 0.0,
      saturatedFat: 0.0,
      transFat: 0.0,
      cholesterol: 0.0,
      sodium: 0.0,
      totalCarbs: 0.0,
      fiber: 0.0,
      sugars: 0.0,
      protein: 0.0*/
    }
  }

  handleRegistration() {
    //console.log(this.state)
    if(!this.state.name) {
      Alert.alert('Please enter your name')
      return
    }
    if(!this.state.age) {
      Alert.alert('Please enter your age')
      return
    }
    if(!this.state.height) {
      Alert.alert('Please enter your height')
      return
    }
    if(!this.state.weight) {
      Alert.alert('Please enter your weight')
      return
    }
    if(!this.state.calories) {
      Alert.alert('Please enter your calories goal')
      return
    }
    if(!this.state.fatCalories) {
      Alert.alert('Please enter your fat calories goal')
      return
    }
    if(!this.state.totalFat) {
      Alert.alert('Please enter your total fat goal')
      return
    }
    if(!this.state.saturatedFat) {
      Alert.alert('Please enter your saturated fat goal')
      return
    }
    if(!this.state.transFat) {
      Alert.alert('Please enter your trans fat goal')
      return
    }
    if(!this.state.cholesterol) {
      Alert.alert('Please enter your cholesterol goal')
      return
    }
    if(!this.state.sodium) {
      Alert.alert('Please enter your sodium goal')
      return
    }
    if(!this.state.totalCarbs) {
      Alert.alert('Please enter your total carbs goal')
      return
    }
    if(!this.state.fiber) {
      Alert.alert('Please enter your fiber goal')
      return
    }
    if(!this.state.sugars) {
      Alert.alert('Please enter your sugars goal')
      return
    }
    if(!this.state.protein) {
      Alert.alert('Please enter your protein goal')
      return
    }

    let goals = {
      calories: this.state.calories,
      fatCalories: this.state.fatCalories,
      totalFat: this.state.totalFat,
      saturatedFat: this.state.saturatedFat,
      transFat: this.state.transFat,
      cholesterol: this.state.cholesterol,
      sodium: this.state.sodium,
      totalCarbs: this.state.totalCarbs,
      fiber: this.state.fiber,
      sugars: this.state.sugars,
      protein: this.state.protein
    }

    let user = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight,
      goals: goals
    }

    this.props.register(user)

  }

  render() {
    return (
      <View style={{marginBottom: 150}}>
        <TopBar/>
        <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 400}}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Welcome</Text>
            <Text style={styles.subtitleText}>Fill in the details and start living healthier</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.input}><TextInput placeholder='Name' value={this.state.name} onChangeText={(text) => this.setState({name: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Age' value={this.state.age} keyboardType='numeric' onChangeText={(text) => this.setState({age: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Height (inches)' value={this.state.height} keyboardType='numeric' onChangeText={(text) => this.setState({height: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Weight (lbs)' value={this.state.weight} keyboardType='numeric' onChangeText={(text) => this.setState({weight: text})}></TextInput></View>
          </View>
          <View style={styles.container}>
            <Text style={styles.titleText}>Set Your Goals</Text>
            <Text style={styles.subtitleText}>Let us give your goals based on your height and weight or set your own</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.input}><TextInput placeholder='Calories' value={this.state.calories} keyboardType='numeric' onChangeText={(text) => this.setState({calories: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Fat Calories' value={this.state.fatCalories} keyboardType='numeric' onChangeText={(text) => this.setState({fatCalories: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Total Fat (g)' value={this.state.totalFat} keyboardType='numeric' onChangeText={(text) => this.setState({totalFat: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Saturated Fat (g)' value={this.state.saturatedFat} keyboardType='numeric' onChangeText={(text) => this.setState({saturatedFat: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Trans Fat (g)' value={this.state.transFat} keyboardType='numeric' onChangeText={(text) => this.setState({transFat: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Cholesterol (mg)' value={this.state.cholesterol} keyboardType='numeric' onChangeText={(text) => this.setState({cholesterol: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Sodium (mg)' value={this.state.sodium} keyboardType='numeric' onChangeText={(text) => this.setState({sodium: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Total Carbohydrates (g)' value={this.state.totalCarbs} keyboardType='numeric' onChangeText={(text) => this.setState({totalCarbs: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Dietary Fibers (g)' value={this.state.fiber} keyboardType='numeric' onChangeText={(text) => this.setState({fiber: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Sugars (g)' value={this.state.sugars} keyboardType='numeric' onChangeText={(text) => this.setState({sugars: text})}></TextInput></View>
            <View style={styles.input}><TextInput placeholder='Protein (g)' value={this.state.protein} keyboardType='numeric' onChangeText={(text) => this.setState({protein: text})}></TextInput></View>
          </View>
          <TouchableOpacity style={{backgroundColor: Colors.primary, width: '25%', justifyContent: 'center', borderRadius: 20}} onPress={() => this.handleRegistration()}>
            <Text style={{textAlign: 'center', color: 'white', padding: 10}}>Finish</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%'
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  subtitleText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20
  },
  input: {
    backgroundColor: '#eaf6ff',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center'
  }
})

function mapStateToProps(state) {
  return {
    menus: state.menus,
    diningHalls: state.diningHalls,
    foods: state.foods,
    value: state.value,
    dataSource: state.dataSource,
    contentToDisplay: state.contentToDisplay,
    content: state.content,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchMenu: (menu) => dispatch({ type: 'FETCH_MENU', payload: menu }),
      fetchDiningHalls: (diningHalls) => dispatch({ type: 'FETCH_DINING_HALLS', payload: diningHalls}),
      fetchFoods: (foods) => dispatch({ type: 'FETCH_FOODS', payload: foods}),
      doneLoading: () => dispatch({ type: 'LOADING_FINISHED'}),
      register: (user) => dispatch({ type: 'REGISTER', payload: user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
