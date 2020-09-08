import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet } from 'react-native'

import TopBar from '../Components/TopBar'
import SubMenu from '../Components/SubMenu'

import {connect} from 'react-redux'

class DiningHallMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      diningHallName: props.route.params.diningHallName,
      menu: props.route.params.menu,
      subMenu: [],
      subMenuItems: []
    }
  }

  async componentDidMount() {
    this.getSubMenus()
    this.render()
  }

  getSubMenus() {
    var tmp = []
    for (const part in this.state.menu[0]) {
      tmp.push(part)
    }
    var allSubMenus = {}
    for (let i = 0; i < tmp.length; i++) {
      var foodItems = {}
      for (let j = 0; j < this.state.menu.length; j++) {
        for (const item in this.state.menu[j][tmp[i]]) {
          foodItems[item] = this.state.menu[j][tmp[i]][item]
        }
      }
      allSubMenus[tmp[i]] = foodItems
    }

    this.setState({
      subMenu: tmp,
      subMenuItems: allSubMenus
    })

  }

  render() {
    var items = [];

    for(let i = 0; i < this.state.subMenu.length; i++) {
      items.push(
        <SubMenu
          subMenuName={this.state.subMenu[i]}
          foods={this.state.subMenuItems[this.state.subMenu[i]]}
        />
      )
    }

    return (
      <View style={{paddingBottom: 200}}>
        <TopBar/>
        <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
          <Text style={{fontSize: 25}}>{this.state.diningHallName}</Text>
        </View>
        <ScrollView contentContainerStyle={{padding: 10, paddingLeft: 10, paddingRight: 10}}>
          { items }
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
