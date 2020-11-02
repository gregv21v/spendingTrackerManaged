import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity,
  Text, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

import { RectButton } from 'react-native-gesture-handler';

import ReceiptSwipeableRow from "./ReceiptSwipeableRow.js"

import DataTable from "./DataTable.js"
import CustomButton from "./CustomButton.js";



class ReceiptsTable extends DataTable {

  constructor(props) {
    super(props)
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


  renderReceiptData(receipt) {
    return (
      <View style={styles.row}>
        <View style={[{flex: 1/3}, styles.cell]}>
          <Text>{receipt.getDate()}</Text>
        </View>
        <View style={[{flex: 1/3}, styles.cell]}>
          <Text>{receipt.getStoreName()}</Text>
        </View>
        <View style={[{flex: 1/3}, styles.cell]}>
          <Text>{receipt.getItemCount()}</Text>
        </View>
      </View>
    )
  }



  renderRowOnWeb(receipt, index) {
    return (
      <View key={index} style={[this.rowColor(index), styles.row]}>
        {this.renderReceiptData(receipt)}
        <View style={styles.actions}>
          <CustomButton
            buttonStyle={styles.editBtn}
            text="Edit"
            onPress={() => this.props.navigation.navigate("Receipt Editor", {
              receipt: receipt
            })}>
          </CustomButton>
          <CustomButton
            buttonStyle={styles.deleteBtn}
            text="Delete"
            onPress={() => this.props.deleteReceipt(receipt)}>
          </CustomButton>
        </View>
      </View>
    )
  }

  renderRowOnMobile(receipt, index) {
    return (
      <ReceiptSwipeableRow
        onPressDeleteAction={() => this.props.deleteReceipt(receipt)}
        onPressEditAction={() => this.props.navigation.navigate("Receipt Editor", {
          receipt: receipt
        })}
        key={index}>
        <View key={index} style={[this.rowColor(index), styles.row]}>
          {this.renderReceiptData(receipt)}
          <RectButton style={{justifyContent: "center", alignItems: "center", width: 100}}>
            <Text>
              {'❭'}
            </Text>
          </RectButton>
        </View>
      </ReceiptSwipeableRow>
    )
  }


  /**
    renderRow()
    @param row - the data of the row to render
    @param index - the index of the row to render
    @description renders a row of the table with the given row, and index
  */
  renderRow(receipt, index) {
    if(Platform.OS === "web") {
      return this.renderRowOnWeb(receipt, index)
    } else {
      return this.renderRowOnMobile(receipt, index)
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
            this.props.receiptList.getReceiptsArray().map((receipt, index) => {
              return this.renderRow(receipt, index+1)
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
  },
  actions: {
    flexDirection: "row",
    flex: 2/5,
    paddingRight: 20
  },
  editBtn: {
    backgroundColor: "green",
    flex: 0.3
  },
  deleteBtn: {
    backgroundColor: "red",
    flex: 0.3
  },
})

export default ReceiptsTable;
