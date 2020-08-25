import * as React from 'react'
import { Text, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

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
        <View>
          <Text>{this.state.title}!</Text>
        </View>
      </View>
    )
  }
}
