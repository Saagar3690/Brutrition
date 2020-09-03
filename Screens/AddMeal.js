import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import TopBar from '../Components/TopBar'
import Nutrition from '../Components/Nutrition'

import {connect} from 'react-redux'

const AddMealStack = createStackNavigator()

class AddMeal extends React.Component {
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
    fetchFoodItem: () => dispatch({ type: 'FETCH_FOOD_ITEM'}),
    updateCount: (value) => dispatch({ type: 'UPDATE_COUNT', payload: value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMeal)

class DiningHalls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation
    }
  }

  async componentDidMount() {
    await this.props.fetchDiningHalls()
    this.render()
  }

  render() {
    console.log(this.props.diningHalls)
    console.log(this.props.foods)
    var items = [];
    for(let i = 0; i < this.props.diningHalls.length; i++) {
      items.push(
        <TouchableWithoutFeedback key={i} onPress={() => this.state.navigation.navigate('Dining Hall Menu', {
          foods: this.props.foods
        })}>
          <View style={{flexDirection: 'column', paddingBottom: 40, justifyContent: 'center'}}>
            <Image source={require('../Images/Food.jpg')} style={{borderRadius: 40, borderWidth: 2, width: 75, height: 75}}/>
            <Text style={{paddingLeft: 12, paddingTop: 5, fontFamily: 'Times New Roman'}}>{this.props.diningHalls[i]}</Text>
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

connect(mapStateToProps, mapDispatchToProps)(DiningHalls)

class DiningHallMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
    }
  }

  async componentDidMount() {
    await this.props.fetchFoods()
    this.render()
  }

  render() {
    var foodItems = [];
    for(let i = 0; i < this.props.foods.length; i++) {
      foodItems.push(
        <View key={i} style={{flexDirection: 'row', paddingBottom: 40}}>
          <Image source={require('../Images/Food.jpg')} style={{borderRadius: 20, borderWidth: 2, width: 30, height: 30}}/>
          <Text style={{flex: 1, fontSize: 14, paddingLeft: 10, paddingRight: 15, paddingTop: 6, fontFamily: 'Times New Roman'}}>{this.props.foods[i]}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', borderWidth: 2, width: 50, height: 25, borderColor: 'gray', borderRadius: 3, justifyContent: 'center'}}>
            <TextInput defaultValue='0' value={this.props.value.toString()} onChangeText={text => this.props.updateCount(text)}></TextInput>
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

connect(mapStateToProps, mapDispatchToProps)(DiningHallMenu)

class NutritionInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigate: props.navigation
    }
  }

  async componentDidMount() {
    await this.props.fetchFoodItem()
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
          {this.props.contentToDisplay ? (
            <Nutrition dataSource={this.props.dataSource} />
          ) : (
            <Text>{this.props.content}</Text>
          )}
        </View>
      </View>
    )
  }
}

connect(mapStateToProps, mapDispatchToProps)(NutritionInfo)

const styles = StyleSheet.create({
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
});
