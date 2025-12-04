import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';


const PaymentOption = ({ title, selected, onPress, }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.wrapper}>
      <View style={styles.row}>
        <View style={[styles.radio, selected && styles.radioSelected]} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {selected  && <View style={styles.children}></View>}
</TouchableOpacity>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15,
    padding: 16,
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 12,
  },
  radioSelected: {
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 16,
  },
  children: {
    marginTop: 12,
  },
});
