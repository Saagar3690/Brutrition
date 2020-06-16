import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Constants from 'expo-constants';

import foodList from './Constants/foodList'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: Object.keys(foodList).map((item) => {
        let tmpString = item.replace(new RegExp('_', 'g'), ' ').toLowerCase()
        let tmpString2 = tmpString.split(' ').map((word => {
          return word.charAt(0).toUpperCase() + word.slice(1)
        })).join(' ')

        return tmpString2
      }),
      query: '',
      contentToDisplay: false,
      content: 'Nothing to display',
      dataSource: ''
    }
  }

  getData() {
    if(this.state.foods.filter(food => food.toLowerCase().includes(this.state.query.toLowerCase())).length === 0) {
      this.setState({
        contentToDisplay: false,
        query: '',
        content: 'No matches'
      })
      return
    } else if (this.state.foods.filter(food => food.toLowerCase().includes(this.state.query.toLowerCase())).length > 1) {
      this.setState({
        contentToDisplay: false,
        content: 'Please select a food item.'
      })
      return
    } else {
      console.log('https://brutrition.herokuapp.com/foods?id=' + this.state.foods.filter(food => food.toLowerCase().includes(this.state.query.toLowerCase()))[0].replace(new RegExp(' ', 'g'), '_').toUpperCase())
      fetch('https://brutrition.herokuapp.com/foods?id=' + this.state.foods.filter(food => food.toLowerCase().includes(this.state.query.toLowerCase()))[0].replace(new RegExp(' ', 'g'), '_').toUpperCase())
      .then((response) => {
        console.log(response)
        response.json()
      })
      .then((responseJSON) => {
        this.setState({
          dataSource: responseJSON.Data[0],
          contentToDisplay: true,
          query: '',
        })
      })
      .catch((error) => {
        console.error(error)
      })
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
          <View style={{flex: 5}}>
            <Autocomplete
              containerStyle={styles.autocompleteContainer}
              placeholder="Enter a food item here"
              autoCapitalize='none'
              autoCorrect={false}
              data={this.state.foods.filter(food => food.toLowerCase().includes(this.state.query.toLowerCase())).length > 0 ? this.state.foods.filter(food => food.toLowerCase().includes(this.state.query.toLowerCase())) : ['No matches']}
              defaultValue={this.state.query}
              onChangeText={text => this.setState({query:text})}
              renderItem={({item, i}) => (
                <TouchableOpacity onPress={() => this.setState({query: item})}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{flex: 1}}><Button title="Enter" onPress={() => this.getData()}/></View>
        </View>
        <View style={styles.descriptionContainer}>
          {this.state.contentToDisplay ? (
            <View>
              <Text>Dish: {this.state.dataSource.foodName}</Text>
              <Text>{this.state.dataSource.description}</Text>
              <Text>Product Info: {this.state.dataSource.prodWebCodes.join(', ')}</Text>
              <Text>Serving Size: {this.state.dataSource.servingSize}</Text>
              <Text>Calories: {this.state.dataSource.calories}</Text>
              <Text>Fat Calories: {this.state.dataSource.fatCalories}</Text>
              <Text>Total Fat: {this.state.dataSource.totalFat.val}</Text>
              <Text>{this.state.dataSource.totalFat.dailyVal}</Text>
              <Text>Saturated Fat: {this.state.dataSource.saturatedFat.val}</Text>
              <Text>{this.state.dataSource.saturatedFat.dailyVal}</Text>
              <Text>Trans Fat: {this.state.dataSource.transFat}</Text>
              <Text>Cholesterol: {this.state.dataSource.cholesterol.val}</Text>
              <Text>{this.state.dataSource.cholesterol.dailyVal}</Text>
              <Text>Sodium: {this.state.dataSource.sodium.val}</Text>
              <Text>{this.state.dataSource.sodium.dailyVal}</Text>
              <Text>Total Carbohydrate: {this.state.dataSource.totalCarbohydrate.val}</Text>
              <Text>{this.state.dataSource.totalCarbohydrate.dailyVal}</Text>
              <Text>Dietary Fiber: {this.state.dataSource.dietaryFiber.val}</Text>
              <Text>{this.state.dataSource.dietaryFiber.dailyVal}</Text>
              <Text>Sugars: {this.state.dataSource.sugars}</Text>
              <Text>Protein: {this.state.dataSource.protein}</Text>
              <Text>Vitamin A: {this.state.dataSource.vitaminA}</Text>
              <Text>Vitamin C: {this.state.dataSource.vitaminC}</Text>
              <Text>Calcium: {this.state.dataSource.calcium}</Text>
              <Text>Iron: {this.state.dataSource.iron}</Text>
            </View>
          ) : (
            <Text>{this.state.content}</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
});
