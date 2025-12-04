import { Button, Text } from '@react-navigation/elements';
import { View,  StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import ProductCard from '../../components/product-сard';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api/api'
import { CoffeeItem } from '../../models/coffee';




export function Home() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



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
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { itemId: item.id })}>
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
      <View >
        <ActivityIndicator size="large" />
        <Text>Завантаження...</Text>
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
