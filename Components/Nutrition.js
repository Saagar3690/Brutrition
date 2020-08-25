import * as React from 'react'
import { Text, View } from 'react-native'

export default class Nutrition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: props.dataSource
    }
  }

  render() {
    return (
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{this.state.dataSource.foodName}</Text>
        <Text style={{fontStyle: 'italic', textAlign: 'center'}}>{this.state.dataSource.description !== this.state.dataSource.prodWebCodes[0] ? this.state.dataSource.description : 'No Description'}</Text>
        <Text style={{fontSize: 10, textAlign: 'center'}}>*{this.state.dataSource.prodWebCodes.join(', ')}</Text>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Serving Size: </Text><Text>{this.state.dataSource.servingSize}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Calories: </Text><Text>{this.state.dataSource.calories}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Fat Calories: </Text><Text>{this.state.dataSource.fatCalories}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Total Fat: </Text><Text>{this.state.dataSource.totalFat.val} ({this.state.dataSource.totalFat.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Saturated Fat: </Text><Text>{this.state.dataSource.saturatedFat.val} ({this.state.dataSource.saturatedFat.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Trans Fat: </Text><Text>{this.state.dataSource.transFat}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Cholesterol: </Text><Text>{this.state.dataSource.cholesterol.val} ({this.state.dataSource.cholesterol.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Sodium: </Text><Text>{this.state.dataSource.sodium.val} ({this.state.dataSource.sodium.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Total Carbohydrate: </Text><Text>{this.state.dataSource.totalCarbohydrate.val} ({this.state.dataSource.totalCarbohydrate.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Dietary Fiber: </Text><Text>{this.state.dataSource.dietaryFiber.val} ({this.state.dataSource.dietaryFiber.dailyVal})</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Sugars: </Text><Text>{this.state.dataSource.sugars}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Protein: </Text><Text>{this.state.dataSource.protein}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Vitamin A: </Text><Text>{this.state.dataSource.vitaminA}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Vitamin C: </Text><Text>{this.state.dataSource.vitaminC}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Calcium: </Text><Text>{this.state.dataSource.calcium}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style={{fontWeight: 'bold'}}>Iron: </Text><Text>{this.state.dataSource.iron}</Text></View>
      </View>
    )
  }
}
