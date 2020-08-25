import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import TopBar from '../Components/TopBar'
import Nutrition from '../Components/Nutrition'

const AddMealStack = createStackNavigator()

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title
    }
  }

  componentDidMount = () => {
    this.render()
  }

  render() {
    return (
      <AddMealStack.Navigator screenOptions={{headerShown: false}}>
        <AddMealStack.Screen name='Dining Halls' component={DiningHalls} />
        <AddMealStack.Screen name='Dining Hall Menu' component={DiningHallMenu} />
        <AddMealStack.Screen name='Nutrition Info' component={NutritionInfo} />
      </AddMealStack.Navigator>
    )
  }
}

class DiningHalls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      menus: {},
      diningHalls: []
    }
  }

  async componentDidMount() {
    await fetch('https://brutrition.herokuapp.com')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        menus: responseJSON.Data
      })
    })

    await fetch('https://brutrition.herokuapp.com/foods/all')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        foods: Object.keys(responseJSON.Data).map((item) => {
          let tmpString = item.replace(new RegExp('_', 'g'), ' ').toLowerCase()
          let tmpString2 = tmpString.split(' ').map((word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
          })).join(' ')

          return tmpString2
        })
      })
    })

    this.processMenus()
    this.render()
  }

  processMenus() {
    var diningHallsLoc = []
    var menuSections = []
    for (var diningHall in this.state.menus) {
      diningHallsLoc.push(diningHall)
      var diningHallArray = this.state.menus[diningHall]
      for (var i = 0; i < diningHallArray.length; i++) {
        for (var menuSection in diningHallArray[i]) {
          if (!menuSections.includes(menuSection)) {
            menuSections.push(menuSection)
          }
        }
      }
    }

    this.setState({
      diningHalls: diningHallsLoc
    })
  }

  render() {
    var items = [];
    for(let i = 0; i < this.state.diningHalls.length; i++) {
      items.push(
        <TouchableWithoutFeedback key={i} onPress={() => this.state.navigation.navigate('Dining Hall Menu', {
          foods: this.state.foods
        })}>
          <View style={{flexDirection: 'column', paddingBottom: 40, justifyContent: 'center'}}>
            <Image source={require('../Images/Food.jpg')} style={{borderRadius: 40, borderWidth: 2, width: 75, height: 75}}/>
            <Text style={{paddingLeft: 12, paddingTop: 5, fontFamily: 'Times New Roman'}}>{this.state.diningHalls[i]}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <View>
        <TopBar/>
        <View style={{flexDirection: 'row', justifyContent: 'left', padding: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Add Meal</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'left', padding: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>All Dining Halls</Text>
        </View>
        <View style={{paddingLeft: 30}}>
          { items }
        </View>
      </View>
    )
  }
}

class DiningHallMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      foods: [],
      value: 0
    }
  }

  async componentDidMount() {
    await fetch('https://brutrition.herokuapp.com/foods/all')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        foods: Object.keys(responseJSON.Data).map((item) => {
          let tmpString = item.replace(new RegExp('_', 'g'), ' ').toLowerCase()
          let tmpString2 = tmpString.split(' ').map((word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
          })).join(' ')

          return tmpString2
        })
      })
    })
    this.render()
  }

  render() {
    var foodItems = [];
    for(let i = 0; i < this.state.foods.length; i++) {
      foodItems.push(
        <View key={i} style={{flexDirection: 'row', paddingBottom: 40}}>
          <Image source={require('../Images/Food.jpg')} style={{borderRadius: 20, borderWidth: 2, width: 30, height: 30}}/>
          <Text style={{flex: 1, fontSize: 14, paddingLeft: 10, paddingRight: 15, paddingTop: 6, fontFamily: 'Times New Roman'}}>{this.state.foods[i]}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', borderWidth: 2, width: 50, height: 25, borderColor: 'gray', borderRadius: 3, justifyContent: 'center'}}>
            <TextInput defaultValue='0' value={this.state.value.toString()} onChangeText={text => this.setState({value: text})}></TextInput>
          </View>
        </View>
      )
    }

    return (
      <View style={{paddingBottom: 200}}>
        <TopBar/>
        <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
          <Text style={{fontSize: 25}}>Dining Hall Name - Meal Type</Text>
        </View>
        <ScrollView contentContainerStyle={{padding: 10, paddingLeft: 30, paddingRight: 30}}>
          { foodItems }
        </ScrollView>
        <Button title='Calculate' buttonStyle={{backgroundColor: Colors.primary }} onPress={() => this.state.navigation.navigate('Nutrition Info')}/>
      </View>
    )
  }
}

class NutritionInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigate: props.navigation,
      dataSource: [],
      contentToDisplay: false
    }
  }

  async componentDidMount() {
    await fetch('https://brutrition.herokuapp.com/foods?id=KETCHUP')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        dataSource: responseJSON.Data[0],
        contentToDisplay: true
      })
    })
    .catch((error) => {
      console.error(error)
    })
    this.render()
  }

  render() {
    return (
      <View>
        <TopBar/>
        <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
          <Text style={{fontSize: 25}}>Nutritional Info</Text>
        </View>
        <View style={styles.descriptionContainer}>
          {this.state.contentToDisplay ? (
            <Nutrition dataSource={this.state.dataSource} />
          ) : (
            <Text>{this.state.content}</Text>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
});
