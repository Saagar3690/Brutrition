import * as React from 'react'
import { Text, View } from 'react-native'

import TopBar from '../Components/TopBar'

export default class Profile extends React.Component {
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
