import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';


/**
  ReceiptSwipeableRow
  adds the swipeable effect to a row in the table
*/
export default class ReceiptSwipeableRow extends Component {


  /**
    renderRightAction()
    @param text the text of the button for this action
    @param color the color of the button for this action
    @param x the x location of this button when it is fully visible
    @param progress ??
    @description renders a right action for swiping right
  */
  renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      alert(text);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  /**
    renderRightActions()
    @param text the text of the button for this action
    @param color the color of the button for this action
    @param x the x location of this button when it is fully visible
    @param progress ??
    @description renders multiple right actions at once
  */
  renderRightActions = progress => (
    <View style={{ width: 192, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
      {this.renderRightAction('Remove', 'red', 128, progress)}
    </View>
  );


  updateRef = ref => {
    this._swipeableRow = ref;
  };

  close = () => {
    this._swipeableRow.close();
  };

  
  render() {
    const { children } = this.props; // child components of the swipeable
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
