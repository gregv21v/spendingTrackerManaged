import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView,
  Text, Dimensions } from 'react-native';


class DataTable extends Component {

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
    this.cellFlex = this.cellFlex.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  cellFlex(columns, index) {
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
                style={[this.cellFlex(row.length, i), styles.cell]}>
                <Text>{cell}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  renderHeader() {
    return (
      <View key={0} style={styles.header}>
        {
          this.props.headers.map((cell, i) => {
            return (
              <View
                key={i}
                style={[this.cellFlex(this.props.headers.length, i), styles.cell]}>
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
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.table}>
          {this.renderHeader()}
          {
            this.props.data.map((row, index) => {
              return this.props.renderRow(row, index)
            })
          }
        </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  header: {
    borderBottomWidth: 2,
    flexDirection: "row"
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

export default DataTable;
