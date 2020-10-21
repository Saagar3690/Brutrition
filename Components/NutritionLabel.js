import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import b from './Bold'

export default ({
    servingSize,
    servingsPerContainer,
    calories,
    totalFat,
    saturatedFat,
    transFat,
    cholesterol,
    sodium,
    totalCarbs,
    dietaryFiber,
    sugars,
    protein,
    vitaminA,
    vitaminC,
    calcium,
    iron
}) => (
    <View style={{borderColor: 'black'}}>
        <Text style={[styles.title, styles.hr]}>Nutrition Facts</Text>
        <Text style={[styles.bold, styles.thickestHr]}>Serving Size</Text>
    </View>
)

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold'
    },
    thickestHr: {
        borderBottomColor: 'black',
        borderBottomWidth: 10
    },
    hr: {
        borderBottomColor: 'gray',
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})
