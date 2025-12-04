import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/colors';


const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{`€ ${product.price.toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 15,
    margin: 10,
    width: 150, 
  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
    image: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.placeholder, 
  },
});

export default ProductCard;