import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class ReceiptSwipeableRow extends Component {

  constructor(props) {
    super(props)
  }



  /**
    renderRightAction()
    @param progress translation progress
    @description renders the edit button
  */
  renderEditAction = (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [192, 0],
    });
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: "orange" }]}
          onPress={this.props.onPressEditAction}>
          <Text style={styles.actionText}>Edit</Text>
        </RectButton>
      </Animated.View>
    );
  };

  /**
    renderRightAction()
    @param progress translation progress
    @description renders the delete button
  */
  renderDeleteAction = (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [128, 0],
    });
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: "red" }]}
          onPress={this.props.onPressDeleteAction}>
          <Text style={styles.actionText}>Delete</Text>
        </RectButton>
      </Animated.View>
    );
  };

  /**
    renderRightActions()
    @param progress ??
    @description renders multiple right actions at once
  */
  renderRightActions = progress => (
    <View style={{ width: 192, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
      {this.renderEditAction(progress)}
      {this.renderDeleteAction(progress)}
    </View>
  );
  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { children } = this.props;
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
