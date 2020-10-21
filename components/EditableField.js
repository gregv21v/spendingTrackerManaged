

import React, { Component } from 'react';
import {TextInput, Text, StyleSheet} from 'react-native'


class EditableField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // the current value of the field
      value: ""
    }
  }

  createEditableComponent() {
    return (
      <TextInput
        style={styles.field}
        onChangeText={text => this.setState({ value: text })}
        value={this.state.value}
      />
    )
  }

  createUneditableComponent() {
    return (
      <Text style={styles.field}>{this.state.value}</Text>
    )
  }

  render() {
    if(this.props.isEditable) {
      return this.createEditableComponent()
    } else {
      return this.createUneditableComponent()
    }
  }
}


const styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default EditableField;
