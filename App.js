import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Keyboard } from 'react-native';
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
      fetch('https://brutrition.herokuapp.com/foods?id=' + this.state.foods.filter(food => food.toLowerCase().includes(this.state.query.toLowerCase()))[0].replace(new RegExp(' ', 'g'), '_').toUpperCase())
      .then((response) => response.json())
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
              data={this.state.foods.filter(food => food.toLowerCase().includes(this.state.query.toLowerCase())).length > 0 ? this.state.foods.filter(food => food.toLowerCase().includes(this.state.query.toLowerCase())).slice(0, 5) : ['No matches']}
              defaultValue={this.state.query}
              onChangeText={text => this.setState({query:text})}
              renderItem={({item, i}) => (
                <TouchableOpacity onPress={() => this.setState({query: item})}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{flex: 1}}><Button title="Enter" onPress={() => {
              Keyboard.dismiss()
              this.getData()
            }}/></View>
        </View>
        <View style={styles.descriptionContainer}>
          {this.state.contentToDisplay ? (
            <View style={{flex: 1}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{this.state.dataSource.foodName}</Text>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>{this.state.dataSource.description}</Text>
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
    flex: 4,
    padding: 5
  },
});
