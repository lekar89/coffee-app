import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ProductCard from '../../components/product-сard';
import { useNavigation } from '@react-navigation/native';


export function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text> tap on item to go to Detail</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { productName: "Coffee Smple" })}>
                <ProductCard product={{ id: '0', name: 'Coffe', price: 15.00, imageUrl: '...' }}></ProductCard>
      </TouchableOpacity>
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
