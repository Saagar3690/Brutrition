import * as React from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Constants from 'expo-constants';
import calculator from '../formulas'


import TopBar from '../Components/TopBar'

import Colors from '../Constants/Colors'

import {connect} from 'react-redux'
import { Keyboard } from 'react-native'

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleRegistration() {
    if(this.state.sex && this.state.sex.toLowerCase() !== "m" && this.state.sex.toLowerCase() !== "f") {
      Alert.alert('Please enter M or F for sex')
      return
    }
    if(this.state.activityLevel && this.state.activityLevel.toLowerCase() !== "none" && this.state.activityLevel.toLowerCase() !== "light" && this.state.activityLevel.toLowerCase() !== "moderate" && this.state.activityLevel.toLowerCase() !== "heavy") {
      Alert.alert('Please enter none, light, moderate, or heavy for activity level')
      return
    }
    if(this.state.weightStatus && this.state.weightStatus.toLowerCase() !== "g" && this.state.weightStatus.toLowerCase() !== "l" && this.state.weightStatus.toLowerCase() !== "c") {
      Alert.alert('Please enter G, L, or C for weight status')
      return
    }

    let goals = {
      calories: this.state.calories ? this.state.calories : this.props.user.goals.calories,
      totalFat: this.state.totalFat ? this.state.totalFat : this.props.user.goals.totalFat,
      sodium: this.state.sodium ? this.state.sodium : this.props.user.goals.sodium,
      totalCarbs: this.state.totalCarbs ? this.state.totalCarbs : this.props.user.goals.totalCarbs,
      fiber: this.state.fiber ? this.state.fiber : this.props.user.goals.fiber,
      sugars: this.state.sugars ? this.state.sugars : this.props.user.goals.sugars,
      protein: this.state.protein ? this.state.protein : this.props.user.goals.protein
    }

    let user = {
      name: this.state.name ? this.state.name : this.props.user.goals.name,
      age: this.state.age ? this.state.age : this.props.user.goals.age,
      height: this.state.height ? this.state.height : this.props.user.goals.height,
      weight: this.state.weight ? this.state.weight : this.props.user.goals.weight,
      gender: this.state.sex ? this.state.sex : this.props.user.goals.sex,
      activityLevel: this.state.activityLevel ? this.state.activityLevel : this.props.user.goals.activityLevel,
      weightStatus: this.state.weightStatus ? this.state.weightStatus : this.props.user.goals.weightStatus,
      goals: goals
    }

    this.props.register(user)

    Alert.alert("Information updated!")

  }

  render() {
    return (
      <View style={{marginBottom: 150}}>
        <TopBar/>
        <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 400}}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Edit Your Information</Text>
            <Text style={styles.subtitleText}>Update all fields you would like. Empty fields will leave those settings as is.</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Name</Text></View>
            <View style={styles.input}><TextInput placeholder='Name' value={this.state.name} onChangeText={(text) => this.setState({name: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Age</Text></View>
            <View style={styles.input}><TextInput placeholder='Age' value={this.state.age} keyboardType='numeric' onChangeText={(text) => this.setState({age: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Height</Text></View>
            <View style={styles.input}><TextInput placeholder='Height (inches)' value={this.state.height} keyboardType='numeric' onChangeText={(text) => this.setState({height: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Weight</Text></View>
            <View style={styles.input}><TextInput placeholder='Weight (lbs)' value={this.state.weight} keyboardType='numeric' onChangeText={(text) => this.setState({weight: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Sex</Text></View>
            <View style={styles.input}><TextInput placeholder='Sex (M for male and F for female)' value={this.state.sex} onChangeText={(text) => this.setState({sex: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Activity Level</Text></View>
            <View style={styles.input}><TextInput placeholder='Activity Level (none, light, moderate, heavy)' value={this.state.activityLevel} onChangeText={(text) => this.setState({activityLevel: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Weight Goal</Text></View>
            <View style={styles.input}><TextInput placeholder='Weight Goal (G for gain, L for lose, and C for current)' value={this.state.weightStatus} onChangeText={(text) => this.setState({weightStatus: text})}></TextInput></View>

          </View>
          <View style={styles.container}>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Calories</Text></View>
            <View style={styles.input}><TextInput placeholder='Calories' value={this.state.calories} keyboardType='numeric' onChangeText={(text) => this.setState({calories: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Fat</Text></View>
            <View style={styles.input}><TextInput placeholder='Total Fat (g)' value={this.state.totalFat} keyboardType='numeric' onChangeText={(text) => this.setState({totalFat: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Sodium</Text></View>
            <View style={styles.input}><TextInput placeholder='Sodium (mg)' value={this.state.sodium} keyboardType='numeric' onChangeText={(text) => this.setState({sodium: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Carbs</Text></View>
            <View style={styles.input}><TextInput placeholder='Total Carbohydrates (g)' value={this.state.totalCarbs} keyboardType='numeric' onChangeText={(text) => this.setState({totalCarbs: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Fiber</Text></View>
            <View style={styles.input}><TextInput placeholder='Dietary Fibers (g)' value={this.state.fiber} keyboardType='numeric' onChangeText={(text) => this.setState({fiber: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Sugars</Text></View>
            <View style={styles.input}><TextInput placeholder='Sugars (g)' value={this.state.sugars} keyboardType='numeric' onChangeText={(text) => this.setState({sugars: text})}></TextInput></View>
            <View style={styles.labelContainer}><Text style={styles.labelText}>Protein</Text></View>
            <View style={styles.input}><TextInput placeholder='Protein (g)' value={this.state.protein} keyboardType='numeric' onChangeText={(text) => this.setState({protein: text})}></TextInput></View>
          </View>
          <TouchableOpacity style={{backgroundColor: Colors.primary, width: '25%', justifyContent: 'center', borderRadius: 20}} onPress={() => this.handleRegistration()}>
            <Text style={{textAlign: 'center', color: 'white', padding: 10}}>Update</Text>
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
  },
  labelContainer: {
    marginLeft: 25,
    paddingBottom: 3
  },
  labelText: {
    fontWeight: 'bold'
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
    menus: state.menus,
    diningHalls: state.diningHalls,
    foods: state.foods,
    value: state.value,
    dataSource: state.dataSource,
    contentToDisplay: state.contentToDisplay,
    content: state.content,
    loading: state.loading,
    user: state.user
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
