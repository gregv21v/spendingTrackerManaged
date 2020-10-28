import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity,
  Text, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

import { RectButton } from 'react-native-gesture-handler';

import ReceiptSwipeableRow from "./ReceiptSwipeableRow.js"

import DataTable from "./DataTable.js"



class ReceiptsTable extends DataTable {

  constructor(props) {
    super(props)

    this.renderCells = this.renderCells.bind(this)
  }

  /**
    rowColor()
    @param index The index of the row
    @description determines the color of a row based on its index
  */
  rowColor(index) {
    if(index % 2 == 0) {
      return {
        backgroundColor: "grey"
      }
    } else {
      return {
        backgroundColor: "white"
      }
    }
  }

  /**
    cellFlex()
    @param rowLength The number of cells in the row
    @param index The index of the current cell
    @description determines the flex value for a given cell
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

  /**
    renderCells()
    @param row - the cells to be rendered
    @description renders the cells of a given row
  */
  renderCells(row) {
    return row.map((cell, i) => {
        return (
            <View
              key={i}
              style={[this.cellFlex(row.length, i), styles.cell]}>
              <Text>{cell}</Text>
            </View>
        )
    })
  }

  /**
    renderRow()
    @param row - the data of the row to render
    @param index - the index of the row to render
    @description renders a row of the table with the given row, and index
  */
  renderRow(row, index) {
    if(Platform.OS === "web") {
      return (
        <View key={index} style={[this.rowColor(index), styles.row]}>
          {this.renderCells(row)}
        </View>
      )
    } else {
      return (
        <ReceiptSwipeableRow key={index}>
          <RectButton key={index} style={[this.rowColor(index), styles.row]}>
            {this.renderCells(row)}
          </RectButton>
        </ReceiptSwipeableRow>
      )
    }
  }

  //{this.renderFinalRow(this.props.data.length)}
  /**
    renderFinalRow()
    @param rowLength the number of columns in a the row
    @description Renders the final row of the table
  */
  renderFinalRow(rowLength) {
    return (
      <TouchableOpacity key={rowLength+2}
        style={[
                {
                  alignItems: "center",
                  justifyContent: "center",
                },
                this.rowColor(rowLength+1),
                styles.row
              ]}
        onPress={this.props.addReceiptOnPress}
      >
        <Text style={{fontSize: 40}}>+</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollableView}
          automaticallyAdjustContentInsets={true}>
          {this.renderHeader()}
          {
            this.props.data.map((row, index) => {
              return this.renderRow(row, index+1)
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
    width: Dimensions.get("window").width - 20,
    flex: .6
  },
  scrollableView: {
    marginHorizontal: 40,
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 350
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("window").width - 20,
    height: 60
  },
  header: {
    borderBottomWidth: 2,
    flexDirection: "row",
    width: Dimensions.get("window").width - 20,
    height: 50
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

export default ReceiptsTable;
