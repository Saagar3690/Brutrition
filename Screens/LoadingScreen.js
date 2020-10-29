import * as React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Colors from '../Constants/Colors'


export default class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name='ios-leaf' size={25} color='white' style={styles.icon}/>
        <Text style={styles.title}>Brutrition</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  icon: {
    transform: [{rotateY: '180deg'}],
    paddingBottom: 7,
    fontSize: 25
  }
})
