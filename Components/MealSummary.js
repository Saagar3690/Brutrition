import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native'

const CircleImage = ({ path }) => {
    return (
        <Image source={require('../Images/icecream.png')} style={{ width: 75, height: 75, borderRadius: 1000 }}></Image>
    )
}

const styles = {
    details: {
        fontSize: 12
    }

}

export default class MealSummary extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { calories, protein, carbs, type } = this.props.data
        return (
            <View style={{flexDirection: 'column', margin: 10, alignItems: 'center'}}>
                <CircleImage ></CircleImage>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 5 }}>{type}</Text>
                <Text style={styles.details}>{calories} cal</Text>
                <Text style={styles.details}>{protein}g pro.</Text>
                <Text style={styles.details}>{carbs}g carb.</Text>
            </View>
        )
    }
}
