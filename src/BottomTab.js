import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {verticalScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from './bottomtabscreens/home/Home';
import Resources from './bottomtabscreens/resources/Resources';
import Progress from './bottomtabscreens/progress/Progress';
import Profile from './bottomtabscreens/profile/Profile';
import ResultDescription from './bottomtabscreens/exam/result/ResultDescription';
import colors from './assets/themeColor/colors';
import {supabase} from '../supabase/supabase';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const screensData = [
  {id: 0, component: Home, icon: 'home', name: 'Home'},
  {id: 1, component: Resources, icon: 'grid', name: 'Resources'},
  // {id: 2, component: Progress, icon: 'insert-chart', name: 'Progress'},
  {id: 2, component: ResultDescription, icon: 'insert-chart', name: 'Progress'},
  {id: 3, component: Profile, icon: 'user-circle', name: 'Profile'},
];

const BottomTab = () => {
  const route = useRoute();
  const [registerData, setRegisterData] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (route.params !== undefined) {
      setEmail(route.params.email);
    }
  }, [route.params]);

  useEffect(() => {
    fetchQuestionsAndAnswers();
  }, [email]);

  const fetchQuestionsAndAnswers = async () => {
    const {data, error} = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching questions and answers:', error.message);
    } else {
      setRegisterData(data);
      matchUser(data);
    }
  };

  const matchUser = async data => {
    if (data.length > 0) {
      const user = data.find(item => item.email === email);
      if (user) {
        await AsyncStorage.setItem('isLogin', JSON.stringify(user));
      }
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.placeholder,
        tabBarStyle: {
          height: verticalScale(80),
          backgroundColor: colors.white,
        },
      }}>
      {screensData.map(item => {
        return (
          <Tab.Screen
            key={item.id}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({color, focused}) => (
                <>
                  {(item.icon === 'home' || item.icon === 'grid') && (
                    <Entypo
                      name={item.icon}
                      color={color}
                      size={
                        item.icon === 'grid'
                          ? verticalScale(25)
                          : verticalScale(22)
                      }
                    />
                  )}
                  {item.icon === 'insert-chart' && (
                    <MaterialIcons
                      name={item.icon}
                      color={color}
                      size={verticalScale(22)}
                    />
                  )}
                  {item.icon === 'user-circle' && (
                    <FontAwesome5
                      name={item.icon}
                      color={color}
                      size={verticalScale(22)}
                    />
                  )}
                  <Text
                    style={{color: color, fontSize: 12, textAlign: 'center'}}>
                    {item.name}
                  </Text>
                </>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTab;
