import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import {connect} from 'react-redux'

import NutritionLabel from './NutritionLabel'

class Nutrition extends React.Component {
  render() {
    return (
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{this.props.dataSource.foodName}</Text>
        <Text style={{fontSize: 10, textAlign: 'center'}}>*{this.props.dataSource.prodWebCodes.join(', ')}</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <NutritionLabel
            style={styles.label}
            servingSize={this.props.dataSource.servingSize}
            servingsPerContainer={2}
            calories={this.props.dataSource.calories}
            totalFat={this.props.dataSource.totalFat.val}
            totalFatPercent={this.props.dataSource.totalFat.dailyVal}
            saturatedFat={this.props.dataSource.saturatedFat.val}
            saturatedFatPercent={this.props.dataSource.saturatedFat.dailyVal}
            transFat={this.props.dataSource.transFat}
            cholesterol={this.props.dataSource.cholesterol.val}
            cholesterolPercent={this.props.dataSource.cholesterol.dailyVal}
            sodium={this.props.dataSource.sodium.val}
            sodiumPercent={this.props.dataSource.sodium.dailyVal}
            totalCarbs={this.props.dataSource.totalCarbohydrate.val}
            totalCarbsPercent={this.props.dataSource.totalCarbohydrate.dailyVal}
            dietaryFiber={this.props.dataSource.dietaryFiber.val}
            dietaryFiberPercent={this.props.dataSource.dietaryFiber.dailyVal}
            sugars={this.props.dataSource.sugars}
            protein={this.props.dataSource.protein}
            vitaminA={this.props.dataSource.vitaminA}
            vitaminC={this.props.dataSource.vitaminC}
            calcium={this.props.dataSource.calcium}
            iron={this.props.dataSource.iron}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    width: '70%',
    borderColor: 'black',
    borderWidth: 1
  }
})

function mapStateToProps(state) {
  return {
    menus: state.menus,
    diningHalls: state.diningHalls,
    foods: state.foods,
    value: state.value,
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
    fetchFoodItem: () => dispatch({ type: 'FETCH_FOOD_ITEM'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nutrition)
