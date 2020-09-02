import * as React from 'react'
import { Text, View } from 'react-native'

import {connect} from 'react-redux'

class Nutrition extends React.Component {
  render() {
    return (
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{this.props.dataSource.foodName}</Text>
        <Text style={{fontStyle: 'italic', textAlign: 'center'}}>{this.props.dataSource.description !== this.props.dataSource.prodWebCodes[0] ? this.props.dataSource.description : 'No Description'}</Text>
        <Text style={{fontSize: 10, textAlign: 'center'}}>*{this.props.dataSource.prodWebCodes.join(', ')}</Text>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Serving Size: </Text><Text>{this.props.dataSource.servingSize}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Calories: </Text><Text>{this.props.dataSource.calories}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Fat Calories: </Text><Text>{this.props.dataSource.fatCalories}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Total Fat: </Text><Text>{this.props.dataSource.totalFat.val} ({this.props.dataSource.totalFat.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Saturated Fat: </Text><Text>{this.props.dataSource.saturatedFat.val} ({this.props.dataSource.saturatedFat.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Trans Fat: </Text><Text>{this.props.dataSource.transFat}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Cholesterol: </Text><Text>{this.props.dataSource.cholesterol.val} ({this.props.dataSource.cholesterol.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Sodium: </Text><Text>{this.props.dataSource.sodium.val} ({this.props.dataSource.sodium.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Total Carbohydrate: </Text><Text>{this.props.dataSource.totalCarbohydrate.val} ({this.props.dataSource.totalCarbohydrate.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Dietary Fiber: </Text><Text>{this.props.dataSource.dietaryFiber.val} ({this.props.dataSource.dietaryFiber.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Sugars: </Text><Text>{this.props.dataSource.sugars}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Protein: </Text><Text>{this.props.dataSource.protein}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Vitamin A: </Text><Text>{this.props.dataSource.vitaminA}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Vitamin C: </Text><Text>{this.props.dataSource.vitaminC}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Calcium: </Text><Text>{this.props.dataSource.calcium}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Iron: </Text><Text>{this.props.dataSource.iron}</Text></View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    dataSource: state.dataSource
  }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchMenu: () => dispatch({ type: 'FETCH_MENU'}),
      fetchDiningHalls: () => dispatch({ type: 'FETCH_DINING_HALLS'}),
      fetchFoods: () => dispatch({ type: 'FETCH_FOODS'}),
      fetchFoodItem: () => dispatch({ type: 'FETCH_FOOD_ITEM'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nutrition)
