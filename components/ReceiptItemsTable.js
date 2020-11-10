import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView,
  Text, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import DataTable from "./DataTable.js"
import EditableField from "./EditableField.js"
import CustomButton from "./CustomButton.js"
import EditableFieldWithAutoComplete from "./EditableFieldWithAutoComplete.js"



class ReceiptItemsTable extends DataTable {

  /*
    constructor()
    Props:
      receipt
  */
  constructor(props) {
    super(props)

    this.state = {
      // the id of the item that is currently being edited
      currentlyEditingId: -1,

      // words that can be used in autofilling fields
      wordSuggestions: [
        "leeks",
        "legumes",
        "lettuce",
        "lemons",
        "lentils"
      ],

      // numbers that can be used in autofilling fields
      numberSuggestions: [
        0,
        1,
        3,
        4
      ]
    }

    // bind functions
    this.editBtnOnPress = this.editBtnOnPress.bind(this)
    this.isCurrentlyEdited = this.isCurrentlyEdited.bind(this)
  }

  /*
    rowColor()
    @param index - the index of the row being styled
    Description: determines the color of the row based upon it's index
  */
  rowColor(index) {
    if(index % 2 == 0) {
      return {
        backgroundColor: "grey"
      }
    } else {
      return {
        backgroundColor: "#a8a394"
      }
    }
  }

  /*
    rowColor()
    @param rowLength - the length of the row being styled
    @param index - the index of the row being styled
    Description: determines flex property of a row

  */
  cellFlex(rowLength, index) {
    if(index == rowLength-1) {
      return {
        flex: 2 * (1/(rowLength+1))
      }
    } else {
      return {
        flex: 1/(rowLength+1)
      }
    }
  }



  // allows you to edit an item
  editBtnOnPress(item) {
    // change the text that displays the properties of the item into
    // text input fields instead
    this.setState({
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

  // get the z index to set that row of the table to
  getZIndex(index) {
    return Object.keys(this.props.receipt.itemList).length - index;
  }

  // render a row of the table
  renderRow(item, index) {
    return (
      <View key={index} style={[{zIndex: this.getZIndex(index)}, this.rowColor(index), styles.row]}>
        <EditableFieldWithAutoComplete
          style={{flex: .25}}
          handleChange={(text) => this.props.handleChange(item, "quantity", text)}
          value={item.quantity}
          suggestions={this.state.numberSuggestions}
          isEditable={this.isCurrentlyEdited(item)} />
        <EditableFieldWithAutoComplete
          style={{flex: .25}}
          handleChange={(text) => this.props.handleChange(item, "name", text)}
          value={item.name}
          suggestions={this.state.wordSuggestions}
          isEditable={this.isCurrentlyEdited(item)} />
        <EditableFieldWithAutoComplete
          style={{flex: .25}}
          handleChange={(text) => this.props.handleChange(item, "pricePerUnit", text)}
          value={item.pricePerUnit}
          suggestions={this.state.numberSuggestions}
          isEditable={this.isCurrentlyEdited(item)} />
        <View style={styles.actions}>
          <CustomButton
            buttonStyle={styles.editBtn}
            text="Edit"
            onPress={() => this.editBtnOnPress(item)}>
          </CustomButton>
          <CustomButton
            buttonStyle={styles.deleteBtn}
            text="-"
            onPress={() => this.props.deleteFunction(item)}>
          </CustomButton>
        </View>
      </View>
    )

  }

  renderHeader() {
    var headers = ["Quantity", "Name", "Price Per Unit", "Actions"]
    return (
      <View key={0} style={styles.header}>
        {
          headers.map((cell, i) => {
            return (
              <View
                key={i}
                style={[this.cellFlex(headers.length, i), styles.cell]}>
                <Text style={styles.headerText}>{cell}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.receipt.getStoreName()}</Text>
        <ScrollView
          style={styles.scrollableView}
          automaticallyAdjustContentInsets={true}>
          {this.renderHeader()}
          {
            this.props.receipt.getItems().map((item, index) => {
              return this.renderRow(item, index)
            })
          }
        </ScrollView>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flex: 2/5,
    flexDirection: "row"
  },
  editBtn: {
    backgroundColor: "green",
    flex: .5
  },
  deleteBtn: {
    backgroundColor: "red",
    flex: .5
  },
  scrollableView: {
    marginHorizontal: 40,
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("window").height - 200
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("window").width - 10,
    height: 50
  },
  header: {
    borderBottomWidth: 2,
    flexDirection: "row",
    width: Dimensions.get("window").width - 10
  },
  headerText: {
    color: "black",
    fontWeight: "bold"
  },
  cell: {
    justifyContent: "center",
    alignItems: "center"
  }
})

export default ReceiptItemsTable;
