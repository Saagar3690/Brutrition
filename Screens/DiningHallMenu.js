import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet } from 'react-native'

import TopBar from '../Components/TopBar'

import {connect} from 'react-redux'

class DiningHallMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      diningHallName: props.diningHallName
    }
  }

  async componentDidMount() {
    this.render()
  }

  render() {
    var foodItems = [];
    for(let i = 0; i < this.props.foods.length; i++) {
      foodItems.push(
        <View key={i} style={{flexDirection: 'row', paddingBottom: 40}}>
          <Image source={require('../Images/Food.jpg')} style={{borderRadius: 20, borderWidth: 2, width: 30, height: 30}}/>
          <Text style={{flex: 1, fontSize: 14, paddingLeft: 10, paddingRight: 15, paddingTop: 6, /*fontFamily: 'Times New Roman'*/}}>{this.props.foods[i]}</Text>
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
          <Text style={{fontSize: 25}}>{this.state.diningHallName}</Text>
        </View>
        <ScrollView contentContainerStyle={{padding: 10, paddingLeft: 30, paddingRight: 30}}>
          { foodItems }
        </ScrollView>
        <Button title='Calculate' buttonStyle={{backgroundColor: Colors.primary }} onPress={() => this.state.navigation.navigate('Nutrition Info')}/>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiningHallMenu)
