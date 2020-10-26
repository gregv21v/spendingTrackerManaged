import React, { Component } from 'react';
import {TextInput, Text, StyleSheet} from 'react-native'


/*
  A field that you can change the editability of
*/
class EditableField extends Component {
  constructor(props) {
    super(props)

    this.renderEditableComponent = this.renderEditableComponent.bind(this)
    this.renderUneditableComponent = this.renderUneditableComponent.bind(this)
  }


  /*
    renderEditableComponent()
    Description: renders the version of this component that is editable.
  */
  renderEditableComponent() {
    return (
      <TextInput
        style={[styles.field, this.props.style]}
        onChangeText={text => this.props.handleChange(text)}
        value={this.props.value}
      />
    )
  }



  /*
    renderUneditableComponent()
    Description: renders the version of this component that is uneditable.
  */
  renderUneditableComponent() {
    return (
      <Text style={[styles.field, this.props.style]}>
        {this.props.value}
      </Text>
    )
  }

  /*
    render()
    Description: renders the EditableField component.
  */
  render() {
    if(this.props.isEditable) {
      return this.renderEditableComponent()
    } else {
      return this.renderUneditableComponent()
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
