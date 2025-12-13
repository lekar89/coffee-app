import { Button, Text } from '@react-navigation/elements';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, LayoutAnimation, UIManager, Platform } from 'react-native';
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

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
  }
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const context = useContext(ThemeContext);


  if (!context) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const handleAddToCart = (item: CoffeeItem) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    dispatch(
      addItem({
        id: item.id.toString(),
        name: item.title,
        price: 10,
      })
    );
  };

  const { theme, toggleTheme } = context;
  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('CartScreen')}
          style={{ marginRight: 12 }}
        >
          <Image
            source={require('../../assets/ic_bag.png')}
            style={{ width: 24, height: 24, resizeMode: 'contain' }}></Image>
        </TouchableOpacity>
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
      onLongPress={() => handleAddToCart(item)}>
      <ProductCard
        product={{
          id: item.id.toString(),
          name: item.title,
          price: rand(1, 50),
          imageUrl: item.image,
        }}
      />
    </TouchableOpacity>
  );



  if (loading) {
    return (
      <View style={[, { backgroundColor: theme === 'light' ? Colors.background : Colors.text }]}>
        <ActivityIndicator size="large" color={theme === 'light' ? Colors.text : Colors.background} />
        <Text style={{ color: theme === 'light' ? Colors.text : Colors.background }}>Завантаження...</Text>
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
      <View style={{ height: 8 }} />
      <Image
        source={require('../../assets/coffe_img.png')}
        style={{
          height: 150,
          resizeMode: 'contain',
          width: '100%',
        }}
      />

      <FlatList<CoffeeItem>
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12 }}
        contentContainerStyle={{ paddingVertical: 12 }}
        style={{ width: '100%' }}
      />
      <View style={{ height: 32 }} />

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
