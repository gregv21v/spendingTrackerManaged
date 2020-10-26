import React, { Component } from 'react';
import {TextInput, Text, StyleSheet} from 'react-native'
import AutoCompleteField from "./AutoCompleteField.js"
import EditableField from "./EditableField.js"


class EditableFieldWithAutoComplete extends EditableField {

  /*
    renderEditableComponent()
    Description: renders the version of this component that is editable.
  */
  renderEditableComponent() {
    return (
      <AutoCompleteField
        style={this.props.style}
        suggestions={this.props.suggestions}
        handleChange={value => this.props.handleChange(value)}
        value={this.props.value}
      />
    )
  }
}

export default EditableFieldWithAutoComplete;
