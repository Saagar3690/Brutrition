import * as React from 'react'
import { Text, View, Image, ScrollView, StyleSheet, Button } from 'react-native'
import TopBar from '../Components/TopBar'
import Meal from '../Objects/Meal'
import {connect} from 'react-redux'

import Colors from '../Constants/Colors'

class Diary extends React.Component {
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
          <Text style={styles.titleText}>{this.state.title}</Text>
          <Text style={styles.subtitleText}>September 2, 2020</Text>
          <View>
          {this.props.meals.map(meal => {
              return (
                <View>
                  <Text style={[styles.subtitleText2, {marginLeft: 20}]}>{meal.type} at DeNeve</Text>
                  <View style={styles.containerH}>
                    <View>
                      <Text style={{marginLeft: 40, fontWeight: 'bold', fontSize: 18}}>Item</Text>
                      {Object.keys(meal.items).map(key => <Text key={key} style={{marginLeft: 40}}>{key}</Text>)}
                    </View>
                    <View>
                      <Text style={{marginLeft: 40, fontWeight: 'bold', fontSize: 18}}>Qty.</Text>
                      {Object.keys(meal.items).map(key => <Text key={key} style={{marginLeft: 40}}>{meal.items[key]}</Text>)}
                    </View>
                  </View>
                </View>
              )
            }
          )}
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    meals: state.meals
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Diary)

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    paddingTop: 10
  },
  subtitleText: {
    fontSize: 24,
    marginLeft: 20,
  },
  subtitleText2: {
    fontSize: 22,
    marginLeft: 20,
    marginTop: 30
  },
  containerH: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20
  },
  containerV: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20
  }
});
