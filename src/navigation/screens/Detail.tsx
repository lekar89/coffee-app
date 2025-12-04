import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

type Props = StaticScreenProps<{
  productName: string;
}>;

export function Detail({ route }: Props) {
  return (
    <View style={styles.container}>
      <Text>youu select: {route.params.productName}</Text>
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
