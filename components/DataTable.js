import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions } from 'react-native';


class DataTable extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.rows}>
           <FlatList
             data={this.props.rows}
             ListHeaderComponent={
               () => (
                 <View style={styles.header}>
                  <FlatList
                    data={this.props.headers} // headers is a list of names
                    numColumns={this.props.headers.length}
                    renderItem={
                      ({item}) => (
                        <Text style={
                          {
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            marginLeft: 5,
                            marginRight: 5,
                            flex: 1/this.props.headers.length
                          }
                        }>
                          {item}
                        </Text>
                      )
                    }/>
                 </View>
               )
             }
             renderItem={
               ({item, index}) => (
                 <View style={ index % 2 === 0 ? styles.rowGrey : styles.rowWhite }>
                   <FlatList
                    data={Object.values(item)}
                    numColumns={Object.values(item).length}
                    renderItem={
                      ({item}) => (
                        <Text style={
                          {
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 5,
                            marginRight: 5,
                            flex: 1/this.props.headers.length
                          }
                        }>
                          {item}
                        </Text>
                      )
                    } />
                 </View>
                )
             }/>
        </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    margin: 40
  },
  header: {
    borderBottomWidth: 2,
  },
  rowWhite: {
    backgroundColor: "white"
  },
  rowGrey: {
    backgroundColor: "grey"
  }
})

export default DataTable;
