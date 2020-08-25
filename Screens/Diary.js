import * as React from 'react'
import { Text, View, Image, ScrollView, TextInput, Button } from 'react-native'

import TopBar from '../Components/TopBar'

import Colors from '../Constants/Colors'

export default class Diary extends React.Component {
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
        <View>
          <Text>{this.state.title}!</Text>
        </View>
      </View>
    )
  }
}
