import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView,
  Text, Dimensions } from 'react-native';


class DataTable2 extends Component {

  constructor(props) {
    super(props)
    /*
      Props variables:
        rows as number
        columns as number
        data as array of arrays
        headers as array

     Data should be stored in an array of arrays
    */
    this.renderRow = this.renderRow.bind(this)
    this.cellStyle = this.cellStyle.bind(this)
    this.renderHeaders = this.renderHeaders.bind(this)
  }

  cellStyle(columns) {
    return {
      flex: 1/columns
    }
  }



  renderRow(row, index) {
    return (
      <View key={index} style={styles.row}>
        {
          row.map((cell, i) => {
            return (
              <View
                key={i}
                style={[this.cellStyle(row.length), styles.cell]}>
                <Text>{cell}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  renderHeaders() {
    return this.renderRow(this.props.headers, 0)
  }





  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.table}>
          {this.renderHeaders()}
          {
            this.props.data.map((row, index) => {
              return this.renderRow(row, index)
            })
          }
        </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  cell: {
    justifyContent: "center",
    alignItems: "center"
  }
})

export default DataTable2;
