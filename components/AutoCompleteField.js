import React, {Component} from 'react'
import {TextInput, View, FlatList,
  StyleSheet, Text, TouchableOpacity} from 'react-native'




class AutoCompleteField extends Component {

  /*
    Props:
      suggestions: an array of suggested words
      handleChange: updates the value of the field
      style: the style of the surrounding view
      value: the set value of the field

  */

  constructor(props) {
    super(props)

    this.state = {
      currentSuggestions: [],
    }

    this.onSubmitEditing = this.onSubmitEditing.bind(this);

  }

  handleSelect(index) {
    this.props.handleChange(this.state.currentSuggestions[index])

    this.setState({
      currentSuggestions: []
    })
  }

  onChangeText(text) {
    var currentSuggestions = [];

    this.props.handleChange(text);

    if(text.length >= 2) {
      // search the suggestions array for something
      // that starts with the same amount of letters
      for (var i = 0; i < this.props.suggestions.length; i++) {
        var suggestion = this.props.suggestions[i];
        //console.log(suggestion.substring(0, text.length));
        if(suggestion.substring(0, text.length) === text) {
          console.log(suggestion);
          currentSuggestions.push([suggestion]);
        }
      }

    }
    this.setState({
      currentSuggestions: currentSuggestions
    })
  }

  onSubmitEditing(event) {
    console.log(event);
    if(event.key === "Enter") {
      this.props.handleChange(this.state.currentSuggestions[0]);
      this.setState({
        currentSuggestions: []
      })
    }
  }


  render() {
    return (
      <View style={[this.props.style, styles.main]}>
        <TextInput
          style={
            {
              flex: 1,
              flexDirection: "row",
              margin: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white"
            }
          }
          onChangeText={text => this.onChangeText(text)}
          onKeyPress={this.onSubmitEditing}
          value={this.props.value} />
        <View>
          <FlatList
            data={this.state.currentSuggestions}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={
                  {
                    backgroundColor: "white",
                    borderRadius: 3,
                    borderWidth: 2
                  }
                }
                onPress={() => this.handleSelect(index)} >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}/>
        </View>
      </View>

    )
  }
}


const styles = StyleSheet.create({
  main: {
    height: 30
  }
})

export default AutoCompleteField;
