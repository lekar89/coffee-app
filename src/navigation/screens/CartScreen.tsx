import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { removeItem, updateQuantity, CartItem } from '../../store/cartSlice';


export const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.item}>
      <Text>{item.name} - {item.quantity} x €{item.price.toFixed(2)}</Text>
      <View style={styles.buttons}>
        <Button title="+" onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} />
        <Button title="-" onPress={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))} />
        <Button title="Remove" onPress={() => dispatch(removeItem(item.id))} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={cart}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  item: { padding: 10, marginBottom: 10, backgroundColor: '#f2f2f2', borderRadius: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});
