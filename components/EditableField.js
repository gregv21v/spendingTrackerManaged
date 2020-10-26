import React, { Component } from 'react';
import {TextInput, Text, StyleSheet} from 'react-native'


class EditableField extends Component {
  constructor(props) {
    super(props)

    this.createEditableComponent = this.createEditableComponent.bind(this)
    this.createUneditableComponent = this.createUneditableComponent.bind(this)
  }



  createEditableComponent() {
    return (
      <TextInput
        style={[styles.field, this.props.style]}
        onChangeText={text => this.props.handleChange(text)}
        value={this.props.value}
      />
    )
  }

  createUneditableComponent() {
    return (
      <Text style={[styles.field, this.props.style]}>
        {this.props.value}
      </Text>
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
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 50
  }
})

export default EditableField;
