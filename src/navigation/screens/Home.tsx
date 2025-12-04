import { Button, Text } from '@react-navigation/elements';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import ProductCard from '../../components/product-сard';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { fetchData } from '../../api/api'
import { CoffeeItem } from '../../models/coffee';
import { ThemeContext } from '../../context/ThemeContext';
import Colors from '../../constants/colors';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { CartScreen } from '../screens/CartScreen';




export function Home() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();


  const context = useContext(ThemeContext);
if (!context) {
  throw new Error('ThemeContext must be used within a ThemeProvider');
}

const { theme, toggleTheme } = context;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('CartScreen')} color={theme === 'light' ? Colors.primary : Colors.text}>
          Кошик
        </Button>
      ),
    });
  }, [navigation, theme]);

  useEffect(() => {
    fetchData()
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError('Не вдалося завантажити дані');
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: CoffeeItem }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { itemId: item.id })}
      onLongPress={() =>
        dispatch(
          addItem({
            id: item.id.toString(),
            name: item.title,
            price: 10,
          })
        )
      }
    >
      <ProductCard
        product={{
          id: item.id.toString(),
          name: item.title,
          price: 10.0,
          imageUrl: item.image,
        }}
      />
    </TouchableOpacity>
  );



  if (loading) {
    return (
      <View style={[, { backgroundColor: theme === 'light' ? Colors.background : Colors.text }]}>
        <ActivityIndicator size="large" color={theme === 'light' ?  Colors.text  : Colors.background} />
        <Text style={{ color: theme === 'light' ?  Colors.text  : Colors.background }}>Завантаження...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View >
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text >Tap on item to go to Detail</Text>

      <FlatList<CoffeeItem>
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
