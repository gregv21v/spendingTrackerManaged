import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView,
  Text, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import DataTable from "./DataTable.js"


class ReceiptsTable extends DataTable {

  constructor(props) {
    super(props)
  }

  // determines the color of the row
  // based upon it's index
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

  renderRow(row, index) {
    return (
      <View key={index} style={[this.rowColor(index), styles.row]}>
        {
          row.map((cell, i) => {
            return (
              <View
                key={i}
                style={[this.cellFlex(row.length, i), styles.cell]}>
                <Text>{cell}</Text>
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
        <Text style={styles.title}>{this.props.title}</Text>
        <ScrollView
          style={styles.scrollableView}
          automaticallyAdjustContentInsets={true}>
          {this.renderHeader()}
          {
            this.props.data.map((row, index) => {
              return this.renderRow(row, index)
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
    height: 50
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
