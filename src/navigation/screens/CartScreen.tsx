import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { removeItem, updateQuantity, CartItem } from '../../store/cartSlice';
import { useNavigation } from '@react-navigation/native';

export const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();

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

  const handleOrder = () => {
    if (cart.length === 0) {
      Alert.alert("Кошик порожній");
      return;
    }
    Alert.alert("Замовлення здійснено");
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }} // відступ для кнопки
        style={{ flex: 1 }}
      />

      <View style={styles.orderButton}>
        <Button title="Замовити" onPress={handleOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: { padding: 10, marginBottom: 10, backgroundColor: '#f2f2f2', borderRadius: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  orderButton: { 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  }
});
