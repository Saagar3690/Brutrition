import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet } from 'react-native'

import TopBar from '../Components/TopBar'
import Nutrition from '../Components/Nutrition'

import {connect} from 'react-redux'

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

const styles = StyleSheet.create({
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(NutritionInfo)
