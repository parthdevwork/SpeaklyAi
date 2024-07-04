import React, {useEffect} from 'react';
import {View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/themeColor/colors';
import Logo from '../assets/svg/Logo.svg';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('onBoarding');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View
      style={{flex: 1, backgroundColor: colors.white, alignItems: 'center'}}>
      <Logo style={{marginTop: verticalScale(200)}} />
    </View>
  );
};

export default SplashScreen;
