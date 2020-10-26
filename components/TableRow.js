

import React, { Component } from 'react';
import {TextInput, Text, StyleSheet} from 'react-native'


class TableRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // the current value of the field
      value: value,
      currentlyEditingId: -1
    }
  }

  // allows you to edit an item
  async editBtnOnPress(item) {
    // change the text that displays the properties of the item into
    // text input fields instead
    await this.setState({
      currentlyEditingId: item.id
    })

  }

  // check to see if a given item is currently being edited
  isCurrentlyEdited(item) {
    if(this.state.currentlyEditingId !== -1) {
      return this.state.currentlyEditingId === item.id;
    } else
      return false
  }

  // allows you to delete an item
  deleteBtnOnPress(item) {
    this.state.receipt.deleteItem(item);

    this.setState({
      rows: this.receiptItemsToRows()
    })

    console.log(this.state.rows);

    this.state.receipt.save();
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

  createField(isCurrentlyEdited) {

  }

  // the fields you can edit
  fields(item) {
    return [
      <EditableField
        isEditable={this.isCurrentlyEdited(item)} />,
      <EditableField
        isEditable={this.isCurrentlyEdited(item)} />,
      <EditableField
        isEditable={this.isCurrentlyEdited(item)} />
    ]
  }

  // the action buttons for the table of receipts
  actionButtons(item) {
    return (
      <View style={styles.actions}>
        <CustomButton
          buttonStyle={styles.editBtn}
          text="Edit"
          onPress={() => this.editBtnOnPress(item)}>
        </CustomButton>
        <CustomButton
          buttonStyle={styles.deleteBtn}
          text="-"
          onPress={() => this.deleteBtnOnPress(item)}>
        </CustomButton>
      </View>
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
    alignItems: "center",
    backgroundColor: "white"
  }
})

export default TableRow;
