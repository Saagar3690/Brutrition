import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import NutritionLabel from '../Components/NutritionLabel'
import TopBar from '../Components/TopBar'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title
    }
  }

  render() {
    return (
      <View>
        <TopBar/>
        <View style={styles.container}>
          <NutritionLabel
            style={styles.label}
            servingSize={'1 cup (228g)'}
            servingsPerContainer={2}
            calories={260}
            totalFat={13}
            totalFatPercent={'20%'}
            saturatedFat={5}
            saturatedFatPercent={'10%'}
            transFat={2}
            cholesterol={30}
            cholesterolPercent={'14%'}
            sodium={660}
            sodiumPercent={'21%'}
            totalCarbs={31}
            totalCarbsPercent={'11%'}
            dietaryFiber={0}
            dietaryFiberPercent={'0%'}
            sugars={5}
            protein={5}
            vitaminA={'30%'}
            vitaminC={'5%'}
            calcium={'8%'}
            iron={'45%'}
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 10
  },
  label: {
    width: '70%',
    borderColor: 'black',
    borderWidth: 1
  }
})