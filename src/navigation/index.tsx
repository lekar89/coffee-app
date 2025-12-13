import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import ic_home from '../assets/ic_home.png';
import ic_cat from '../assets/ic_categoty.png';
import { Home } from './screens/Home';
import { Detail } from './screens/Detail';
import { Categories } from './screens/Categories';
import { NotFound } from './screens/NotFound';
import { CartScreen } from './screens/CartScreen';


const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Main',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={ic_home}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    // Updates: {
    //   screen: Categories,
    //   options: {
    //     title: 'Categories',
    //     tabBarIcon: ({ color, size }) => (
    //       <Image
    //         source={ic_cat}
    //         tintColor={color}
    //         style={{
    //           width: size,
    //           height: size,
    //         }}
    //       />
    //     ),
    //   },
    // },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
     HomeScreen: {
      screen: Home,
      options: {
        title: 'Кошик', 
      },
    },
    Detail: {
      screen: Detail,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    CartScreen: {
      screen: CartScreen,
      options: {
        title: 'Кошик', 
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
